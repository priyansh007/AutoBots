'''
This is a base template for tasks, which are essentially just tasks that we can perform to create our bot.
For instance, we will have a Relevance task, where we will as the LM to determine the relevance of a question.
We will also have a questioning answering task where the LM will be used to actually answer our question.
'''

DATA_PATH = './data'

class Task:
    def __init__(self):
        pass

    def __len__(self) -> int:
        pass

    def get_input(self, idx: int) -> str:
        pass

    def test_output(self, idx: int, output: str):
        pass