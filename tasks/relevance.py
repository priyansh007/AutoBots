from tasks.base import Task, DATA_PATH


class RelevanceTask(Task):
    '''
    Input (x)   : a text instruction
    Output (y)  : 'relevant' or 'irrelevant'
    '''

    def __init__(self, files=['documents'])