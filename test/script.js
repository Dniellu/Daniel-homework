async function fetchStockInfo() {
    const stockSymbol = document.getElementById('stockSymbol').value;

    try {
        const response = await fetch(`https://finance.yahoo.com/quote/${stockSymbol}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const companyNameElement = doc.querySelector('.D(ib) > h1');
        const priceElement = doc.querySelector('.Trsdu(0.3s) > span');

        if (companyNameElement && priceElement) {
            const companyName = companyNameElement.textContent;
            const price = priceElement.textContent;

            const stockInfo = document.getElementById('stockInfo');
            stockInfo.innerHTML = `<h2>${companyName}</h2><p>当前价格: ${price}</p>`;
        } else {
            throw new Error('无法找到相应元素');
        }
    } catch (error) {
        console.error('发生错误:', error);
    }
}
