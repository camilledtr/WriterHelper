import requests
from bs4 import BeautifulSoup

def scrape_synonyms(word):
    base_url = f"https://www.synonymo.fr/synonyme/{word}"

    response = requests.get(base_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        synonym_elements = soup.select(".fiche .synos li a")

        synonyms = [element.text for element in synonym_elements]
        return synonyms
    else:
        print("Error:", response.status_code)
        return []

# test terminal
if __name__ == "__main__":
    search_word = input("Enter a word to find synonyms: ")
    synonyms = scrape_synonyms(search_word)

    if synonyms:
        print(f"Synonyms for '{search_word}':")
        for synonym in synonyms:
            print("-", synonym)
    else:
        print(f"No synonyms found for '{search_word}'.")