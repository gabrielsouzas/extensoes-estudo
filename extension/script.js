const form = document.querySelector('form');
const input = document.querySelector('.input');

// Função principal que vai substituir as imagens na tela
// url: É o parametro que foi passado via args nas função chrome.scripting
const replaceImages = (url) => {
    // Busca todos os elementos com a tag img
    const images = document.querySelectorAll('img');

    // Percorre o array com as imagens retornadas
    images.forEach((image) => image.src = url)
}

// Event Listener do formulario com async na arrow function por causa do await
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Aqui ele vai selecionar a aba que está aberta no Chrome
    // Usa o await porque ele leva um tempo para retornar esses dados
    // Salva a primeira posição do array retornado na variavel tab
    // Isso é a desestruturação de um array e para mais valores pode ser usado [primeiroItemdoArray, segundoItemdoArray, etc...]
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Injeta um script no Google Chrome passando um array
    // Com os indices descritos abaixo:
    chrome.scripting.executeScript({
        // target: Passa outro array com o indice tabId e com o valor retornado na variavel tab (apenas o id)
        target: { tabId: tab.id },
        // function: Passa a função que será executada na página
        function: replaceImages,
        // args: Argumentos que vão ser passados para serem utilizados, no caso o input.value (valor que foi passado no input do index.html)
        args: [input.value]
    });
});