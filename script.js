document.getElementById('generateBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('excelInput');
    const output = document.getElementById('outputScript');

    if (fileInput.files.length === 0) {
        alert("Lütfen önce bir Excel dosyası seçin!");
        return;
    }

    const file = fileInput.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    // VBA Mantığını Tarayıcı Konsoluna Uyarlama
    const automationScript = `
(async () => {
    const rawData = ${JSON.stringify(jsonData)};
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    console.log("🚀 Otomasyon başlatıldı...");

    for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        // Sütun başlıklarını Excel'inize göre güncelleyin
        const valWO = row["WO"] || ""; 
        const valTC = row["TASK CARD"] || "";

        console.log(\`İşleniyor Satır \${i + 2}: \${valWO}\`);

        try {
            // ADIM 1: Checkbox Seçimi (jstree-checkbox)
            const checkbox = document.querySelector('.jstree-checkbox');
            if (checkbox) {
                checkbox.click();
                await sleep(2000);
            }

            // ADIM 2: Work Order Veri Girişi
            const woInput = document.querySelector('#workOrderNumber_miid10_ExtSearchForm');
            if (woInput) {
                woInput.value = valWO;
                woInput.dispatchEvent(new Event('input', { bubbles: true }));
                woInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // ADIM 3: NRC Veri Girişi (Dinamik ID Yönetimi)
            let nrcInput = document.querySelector('#nrwiNo_miid10_ExtSearchForm') || 
                           document.querySelector('[name="nrwiNo"]') || 
                           document.querySelector('[id*="nrwiNo"]');

            if (nrcInput) {
                nrcInput.value = valTC;
                nrcInput.dispatchEvent(new Event('input', { bubbles: true }));
                nrcInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // ADIM 4: Arama Butonu
            const araBtn = document.querySelector('[name="Ara"]') || 
                           Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Ara'));
            
            if (araBtn) {
                araBtn.click();
            } else {
                // Buton yoksa ENTER gönder
                document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            }

            await sleep(5000); // Sayfa yükleme beklemesi

            // ADIM 5: Onay/Tamam Butonu
            const okBtn = document.querySelector('[id*="dialog-button-ok"]') || 
                           document.querySelector('button[name="Tamam"]');
            if (okBtn) {
                okBtn.click();
                await sleep(1500);
            }

            // ADIM 6: Arşivde Ara
            const archiveBtn = document.querySelector('[id*="archiveSearchButton"]') || 
                               document.querySelector('[title*="Arsiv"]');
            if (archiveBtn) {
                archiveBtn.click();
                await sleep(2000);
            }

        } catch (err) {
            console.error(\`Satır \${i + 2} hatası: \`, err);
        }
    }
    alert("İşlem başarıyla tamamlandı!");
})();
    `;

    output.value = automationScript;
});

// Kopyalama Butonu İşlevi
document.getElementById('copyBtn').addEventListener('click', () => {
    const copyText = document.getElementById('outputScript');
    copyText.select();
    document.execCommand("copy");
    alert("Kod kopyalandı! Şimdi hedef sitede F12 > Console kısmına yapıştırabilirsiniz.");
});
