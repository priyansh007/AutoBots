import openai

API_KEY = "INSERT API KEY"
openai.api_key = API_KEY
model_id = 'gpt-4-32k'

completion = openai.ChatCompletion.create(model='gpt-4-32k', messages=[{'role': 'user', 'content': 'Write an essay about penguins'}])
print(completion.choices[0].message.content)