'''
This module will include all prompts relevant to making sure the question makes sense given the context of the documents.
'''

standard_prompt = '''
Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: {input}
'''

cot_prompt = '''
Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: {input}

Make a plan then write. Your output should be of the following format:

Plan:
Your plan here.

Passage:
Your passage here.
'''

cot_prompt = '''
Given the following extracted parts of a long document and a question, give an explanation to why this question is relevant to the document. If it is not relevant put "Not relevant". Include the source that helps your answer, if any. ("SOURCES").
If you don't know the answer, just say that you don't know. Don't try to make up an answer.
ALWAYS return a "SOURCES" part in your answer.

QUESTION: Can you explain what chaining means?
=========
Content: Chain-of-thought (CoT) prompting [35] was proposed to address cases where the mapping of
input x to output y is non-trivial (e.g. when x is a math question and y is the final numerical answer).
The key idea is to introduce a chain of thoughts z1, · · · , zn to bridge x and y, where each zi
is a
coherent language sequence that serves as a meaningful intermediate step toward problem solving
(e.g. zi could be an intermediate equation for math QA). To solve problems with CoT, each thought
zi ∼ p
CoT
θ
(zi
| x, z1···i−1) is sampled sequentially, then the output y ∼ p
CoT
θ
(y|x, z1···n). In
practice, [z1···n, y] ∼ p
CoT
θ
(z1···n, y|x) is sampled as a continuous language sequence, and the
decomposition of thoughts (e.g. is each zi a phrase, a sentence, or a paragraph) is left ambiguous.
Source: Research paper
...
=========
FINAL ANSWER:
'''


vote_prompt = '''Given an instruction and several choices, decide which choice is most promising. Analyze each choice in detail, then conclude in the last line "The best choice is {s}", where s the integer id of the choice.
'''

compare_prompt = '''Briefly analyze the coherency of the following two passages. Conclude in the last line "The more coherent passage is 1", "The more coherent passage is 2", or "The two passages are similarly coherent".
'''

score_prompt = '''Analyze the following passage, then at the last line conclude "Thus the coherency score is {s}", where s is an integer from 1 to 10.
'''