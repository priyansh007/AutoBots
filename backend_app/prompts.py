cot_prompt = '''
Write a coherent answer to a question given various sources. The question: {question}. The sources to use are: {sources}

First check if the sources can answer the question and state why.

Second extract parts from the various sources that help support your answer and state why you chose these.

Third generate an answer based off the extracted parts of relevant sources and give a reason why this answer was generated from the sources you chose.

Only output the output and nothing else

Your output should be of the following format:


Answerable: (Yes or No)
Reasoning 1:

Sources: (List of Sources)
Reasoning 2:

Answer:
Reasoning 3:

'''

vote_prompt = '''Given an instruction and several choices, decide which choice is most promising. Analyze each choice in detail, then conclude in the last line "The best choice is {s}", where s the integer id of the choice.
'''
