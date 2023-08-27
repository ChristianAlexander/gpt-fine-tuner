#!/usr/bin/env node
require("dotenv").config();

const { Command } = require("commander");
const fs = require("fs");
const { OpenAI } = require("openai");
const { retry } = require("@lifeomic/attempt");

const program = new Command();
const openai = new OpenAI();

program
  .name("gpt-fine-tuning")
  .description("CLI to manage fine tuning of the OpenAI GPT 3.5 model");

program
  .command("show")
  .argument("<id>", "the ID of the fine tuning job")
  .description("Show the details of a fine tuning job")
  .action(async (id) => {
    const job = await openai.fineTuning.jobs.retrieve(id);

    if (!job) {
      console.warn(`Job with ID ${id} not found`);
      return;
    }
    console.log("Job:");

    console.log(job);

    console.log("Events:");

    const allEvents = [];
    for await (const {
      created_at,
      type,
      message,
      data,
    } of openai.fineTuning.jobs.listEvents(id)) {
      allEvents.push({
        created_at: new Date(created_at * 1000).toISOString(),
        type,
        message,
        data: JSON.stringify(data),
      });
    }
    allEvents.reverse();

    console.table(allEvents);
  });

program
  .command("cancel")
  .argument("<id>", "the ID of the fine tuning job")
  .description("Cancel a fine tuning job")
  .action(async (id) => {
    const job = await openai.fineTuning.jobs.cancel(id);

    if (!job) {
      console.warn(`Job with ID ${id} not found`);
      return;
    }

    console.log(JSON.stringify(job));
  });

program
  .command("ls")
  .description("List the fine tuning jobs")
  .action(async () => {
    const {
      body: { data: jobList },
    } = await openai.fineTuning.jobs.list();

    if (!jobList.length) {
      console.warn("No fine tuning jobs found");
      return;
    }

    const result = jobList.reduce(
      (acc, job) => ({
        ...acc,
        [job.id]: {
          trainingFileId: job.training_file,
          status: job.status,
          trainedTokens: job.trained_tokens,
        },
      }),
      {}
    );

    console.table(result);
  });

program
  .command("create")
  .requiredOption(
    "-f --file <filePath>",
    "the path of a file to use for fine tuning"
  )
  .option("-m --model [model]", "the model to fine-tune", "gpt-3.5-turbo-0613")
  .option("--epochs [n_epochs]", "the number of epochs to train")
  .option("--suffix [suffix]", "the suffix for the created fine-tune model ID")
  .description("Create a fine tuning job")
  .action(async ({ file: filePath, model, epochs, suffix }) => {
    const { id: fileId } = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "fine-tune",
    });
    console.log("Uploaded training file");

    // Wait for the file to be ready
    await retry(
      async () => {
        const file = await openai.files.retrieve(fileId);

        console.log(
          "Waiting for file to be ready. Status is currently:",
          file.status
        );

        if (file.status !== "processed") {
          throw new Error("File not ready");
        }
      },
      {
        delay: 1000,
        factor: 2,
        maxAttempts: 10,
      }
    );

    const fineTune = await openai.fineTuning.jobs.create({
      training_file: fileId,
      model,
      suffix,
      hyperparameters: {
        n_epochs: epochs ?? "auto",
      },
    });

    console.log(fineTune);
  });

program.parseAsync();
