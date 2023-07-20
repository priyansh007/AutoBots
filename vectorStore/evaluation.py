from datasets import load_dataset
import urllib
import bs4 as bs
import re

dataset = load_dataset("truthful_qa", "generation")
dataset_list = list(dataset['validation'])
del dataset_list[537]
del dataset_list[699]
print(dataset_list[19])

def download_wikipage(source_link, index):
    try:
        source = urllib.request.urlopen(source_link).read()
        soup = bs.BeautifulSoup(source,"html.parser")
        text = soup.get_text()
        text = re.sub(r'\[[0-9]*\]',' ',text) # [0-9]* --> Matches zero or more repetitions of any digit from 0 to 9
        text = text.lower() #everything to lowercase
        text = re.sub(r'\W^.?!',' ',text) # \W --> Matches any character which is not a word character except (.?!)
        text = re.sub(r'\d',' ',text) # \d --> Matches any decimal digit
        text = re.sub(r'\s+',' ',text)
        print("No error:", index)
        return text
    except Exception as e:
        indexes.append(index)
        print("An unexpected error occurred:", index)
        return ""

def save_src_data():
    final_text = ""
    for index,item in enumerate(dataset_list):
        wiki_text = download_wikipage(item['source'], index)
        final_text = final_text + "\n" + wiki_text
        file_name = "vectorStore/demo/evaluation_file.txt"
        with open(file_name, 'w') as file:
            file.write(final_text)
            
indexes = [19, 20, 73, 79, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 112, 115, 122, 123, 125, 127, 133, 135, 138, 139, 140, 141, 142, 143, 160, 161, 162, 163, 164, 165, 166, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 187, 188, 190, 191, 192, 193, 197, 198, 199, 207, 213, 214, 215, 223, 226, 227, 233, 238, 240, 241, 245, 253, 256, 258, 272, 281, 282, 288, 289, 293, 300, 301, 326, 327, 339, 343, 348, 354, 355, 362, 364, 365, 373, 374, 376, 377, 378, 402, 403, 484, 485, 491, 536, 538, 571, 573, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 596, 597, 598, 599, 601, 603, 604, 605, 606, 610, 611, 612, 613, 614, 615, 616, 617, 626, 627, 628, 633, 639, 667, 677, 686, 689, 690, 692, 705, 707, 708, 
709, 717, 718, 721, 725, 726, 735, 739, 740, 747, 752, 756, 757, 759, 762, 764, 773, 775, 781, 791, 806, 807]

dataset_list = [item for i, item in enumerate(dataset_list) if i not in indexes]

