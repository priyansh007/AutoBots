import Embedding
import os

#Set your coherekey here
os.environ['cohere_key'] = ''


directory_path = "./Extra/vectorStore/demo"
embedding_pickle_path = "./Extra/vectorStore/sentence_embedding_func.pkl"
vector_path = "./Extra/vectorStore/chroma_db_sentence_embd"

print("okay")
Embedding.save_embedding_into_pickle(embedding_pickle_path)
print("okay2")
Embedding.save_chroma_using_embedding(directory_path,
                            embedding_pickle_path,
                            vector_path)

print("okay3")
#Now lets ask query to saved embeddings
query = "What happened in japan?"
#Cohere API key
api_key = os.environ['cohere_key']

#Ans1 contains all the facts which are there for asked Query
ans1 = Embedding.load_chroma_with_query_without_compressor(vector_path,
                       embedding_pickle_path,
                       query)

print(ans1)

#Ans2 contains all the facts with compressor and reranker which are there for asked Query
ans2 = Embedding.load_chroma_with_query_with_compressor(vector_path,
                       embedding_pickle_path,
                       query, api_key)

print(ans2)
