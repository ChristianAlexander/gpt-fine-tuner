# GPT Fine-Tuner

A command line application for creating and managing OpenAI fine-tuning jobs.

For details on fine-tuning, check out OpenAI's guide: https://platform.openai.com/docs/guides/fine-tuning

> **Note**
> This application requires an OpenAI account and key. The API key must be set with the `OPENAI_API_KEY` environment variable.

## Usage

This package is available on NPM as `gpt-fine-tuner`, allowing it to be invoked via `npx gpt-fine-tuner`.

### Create a fine-tuning job

`npx gpt-fine-tuner create`

```
Usage: gpt-fine-tuner create [options]

Create a fine tuning job

Options:
  -f --file <filePath>  the path of a file to use for fine tuning
  -m --model [model]    the model to fine-tune (default: "gpt-3.5-turbo-0613")
  --epochs [n_epochs]   the number of epochs to train
  --suffix [suffix]     the suffix for the created fine-tune model ID
  -h, --help            display help for command
```

#### Example Output

```
Uploaded training file
Waiting for file to be ready. Status is currently: uploaded
Waiting for file to be ready. Status is currently: uploaded
Waiting for file to be ready. Status is currently: uploaded
Waiting for file to be ready. Status is currently: processed
{
  object: 'fine_tuning.job',
  id: 'ftjob-eYj4cdWZaFkPQgMlKezTllKB',
  model: 'gpt-3.5-turbo-0613',
  created_at: 1693157226,
  finished_at: null,
  fine_tuned_model: null,
  organization_id: 'org-SCXExDLIo3BCsa0VU0P14xX6',
  result_files: [],
  status: 'created',
  validation_file: null,
  training_file: 'file-eCUCduf1Wk5xepOMWp4SzzQd',
  hyperparameters: { n_epochs: 10 },
  trained_tokens: null
}
```

### Show the details of a fine-tuning job

`npx gpt-fine-tuner show`

```
Usage: gpt-fine-tuner show [options] <id>

Show the details of a fine tuning job

Arguments:
  id          the ID of the fine tuning job

Options:
  -h, --help  display help for command
```

#### Example Output

```
Job:
{
  object: 'fine_tuning.job',
  id: 'ftjob-eYj4cdWZaFkPQgMlKezTllKB',
  model: 'gpt-3.5-turbo-0613',
  created_at: 1693157226,
  finished_at: 1693157615,
  fine_tuned_model: 'ft:gpt-3.5-turbo-0613:personal::7sDvgoXF',
  organization_id: 'org-SCXExDLIo3BCsa0VU0P14xX6',
  result_files: [ 'file-c0Dx9bzfDCb78cKc0ocbqpN7' ],
  status: 'succeeded',
  validation_file: null,
  training_file: 'file-eCUCduf1Wk5xepOMWp4SzzQd',
  hyperparameters: { n_epochs: 10 },
  trained_tokens: 48460
}
Events:
┌─────────┬────────────────────────────┬───────────┬──────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────┐
│ (index) │         created_at         │   type    │                                 message                                  │                                              data                                              │
├─────────┼────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────┤
│    0    │ '2023-08-27T17:27:06.000Z' │ 'message' │           'Created fine-tune: ftjob-eYj4cdWZaFkPQgMlKezTllKB'            │                                             'null'                                             │
│    1    │ '2023-08-27T17:27:07.000Z' │ 'message' │                        'Fine tuning job started'                         │                                             'null'                                             │
│    2    │ '2023-08-27T17:30:32.000Z' │ 'metrics' │                    'Step 10/100: training loss=0.40'                     │  '{"step":10,"train_loss":0.4045186936855316,"train_mean_token_accuracy":0.9142857193946838}'  │
│    3    │ '2023-08-27T17:30:55.000Z' │ 'metrics' │                    'Step 20/100: training loss=0.15'                     │  '{"step":20,"train_loss":0.152922585606575,"train_mean_token_accuracy":0.9791666865348816}'   │
│    4    │ '2023-08-27T17:31:13.000Z' │ 'metrics' │                    'Step 30/100: training loss=0.04'                     │ '{"step":30,"train_loss":0.036188364028930664,"train_mean_token_accuracy":0.988304078578949}'  │
│    5    │ '2023-08-27T17:31:33.000Z' │ 'metrics' │                    'Step 40/100: training loss=0.04'                     │ '{"step":40,"train_loss":0.036606818437576294,"train_mean_token_accuracy":0.9885714054107666}' │
│    6    │ '2023-08-27T17:31:53.000Z' │ 'metrics' │                    'Step 50/100: training loss=0.05'                     │ '{"step":50,"train_loss":0.04977662116289139,"train_mean_token_accuracy":0.9858155846595764}'  │
│    7    │ '2023-08-27T17:32:11.000Z' │ 'metrics' │                    'Step 60/100: training loss=0.01'                     │  '{"step":60,"train_loss":0.0068197101354599,"train_mean_token_accuracy":0.9942528605461121}'  │
│    8    │ '2023-08-27T17:32:29.000Z' │ 'metrics' │                    'Step 70/100: training loss=0.00'                     │         '{"step":70,"train_loss":0.0002029397728620097,"train_mean_token_accuracy":1}'         │
│    9    │ '2023-08-27T17:32:49.000Z' │ 'metrics' │                    'Step 80/100: training loss=0.00'                     │        '{"step":80,"train_loss":0.000012278076610527933,"train_mean_token_accuracy":1}'        │
│   10    │ '2023-08-27T17:33:08.000Z' │ 'metrics' │                    'Step 90/100: training loss=0.00'                     │        '{"step":90,"train_loss":0.000012555338798847515,"train_mean_token_accuracy":1}'        │
│   11    │ '2023-08-27T17:33:28.000Z' │ 'metrics' │                    'Step 100/100: training loss=0.00'                    │       '{"step":100,"train_loss":0.000020958901586709544,"train_mean_token_accuracy":1}'        │
│   12    │ '2023-08-27T17:33:33.000Z' │ 'message' │ 'New fine-tuned model created: ft:gpt-3.5-turbo-0613:personal::7sDvgoXF' │                                             'null'                                             │
│   13    │ '2023-08-27T17:33:35.000Z' │ 'message' │                 'Fine-tuning job successfully completed'                 │                                             'null'                                             │
└─────────┴────────────────────────────┴───────────┴──────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### List fine-tuning jobs

`npx gpt-fine-tuner ls`

```
Usage: gpt-fine-tuner ls [options]

List the fine tuning jobs

Options:
  -h, --help  display help for command
```

#### Example Output

```
┌────────────────────────────────┬─────────────────────────────────┬─────────────┬───────────────┐
│            (index)             │         trainingFileId          │   status    │ trainedTokens │
├────────────────────────────────┼─────────────────────────────────┼─────────────┼───────────────┤
│ ftjob-eYj4cdWZaFkPQgMlKezTllKB │ 'file-eCUCduf1Wk5xepOMWp4SzzQd' │ 'succeeded' │     48460     │
└────────────────────────────────┴─────────────────────────────────┴─────────────┴───────────────┘
```

### Cancel a fine-tuning job

`npx gpt-fine-tuner cancel`

```Usage: gpt-fine-tuner cancel [options] <id>

Cancel a fine tuning job

Arguments:
  id          the ID of the fine tuning job

Options:
  -h, --help  display help for command
```

---

_This application is not associated with the OpenAI company in any way. It is a utility application written by an independent third-party._
