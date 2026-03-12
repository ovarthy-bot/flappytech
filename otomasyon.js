// Sayfadaki asenkron işlemlerin (yüklemelerin) tamamlanmasını beklemek için yardımcı fonksiyon
const bekle = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function islemleriOtomatizeEt(workOrderDegeri, nrwiNoDegeri) {
    try {
        console.log("1. Ağaçtaki (jstree) onay kutusu kontrol ediliyor...");
        const treeCheckbox = document.querySelector('.jstree-icon.jstree-checkbox');
        if (treeCheckbox) treeCheckbox.click();

        await bekle(500); // UI'ın tepki vermesi için kısa bir bekleme

        console.log("2. İş Emri Numarası giriliyor...");
        const workOrderInput = document.getElementById('workOrderNumber_miid10_ExtSearchForm');
        if (workOrderInput) {
            workOrderInput.value = workOrderDegeri;
            // Sistemin (jQuery/ExtJS) değişikliği algılaması için event tetikliyoruz
            workOrderInput.dispatchEvent(new Event('input', { bubbles: true }));
            workOrderInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        console.log("3. NRWI No giriliyor...");
        const nrwiInput = document.getElementById('nrwiNo_miid10_ExtSearchForm');
        if (nrwiInput) {
            nrwiInput.value = nrwiNoDegeri;
            nrwiInput.dispatchEvent(new Event('input', { bubbles: true }));
            nrwiInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        await bekle(500);

        console.log("4. 'Ara' butonuna tıklanıyor...");
        const araBtn = Array.from(document.querySelectorAll('.ui-button-text'))
                            .find(el => el.textContent.trim() === 'Ara');
        if (araBtn) araBtn.click();

        console.log("Sonuçların yüklenmesi bekleniyor...");
        // Arama sonucunun gelmesi için ağ hızınıza göre burayı artırabilirsiniz (Şu an 3 saniye)
        await bekle(3000); 

        console.log("5. Listeden ilgili kayıt işaretleniyor (otrCBChk)...");
        const gridCheckbox = document.querySelector('.otrCBChk');
        if (gridCheckbox) gridCheckbox.click();

        await bekle(500);

        console.log("6. 'İşlemler' menüsü açılıyor...");
        const islemlerMenusu = Array.from(document.querySelectorAll('.ui-selectmenu-text'))
                                     .find(el => el.textContent.trim() === 'İşlemler');
        if (islemlerMenusu) {
            // Tıklamayı direkt span'a veya üst kapsayıcısına yapmak gerekebilir
            islemlerMenusu.click();
            // jQuery UI selectmenu için alternatif tetikleme: 
            // islemlerMenusu.parentElement.click(); 
        }

        // Menünün DOM'a eklenmesi/açılması için bekle
        await bekle(1000);

        console.log("7. 'PDF olarak yazdır' seçeneğine tıklanıyor...");
        const pdfSecenek = Array.from(document.querySelectorAll('.ui-menu-item-wrapper'))
                                 .find(el => el.textContent.includes('PDF olarak yazdır'));
        if (pdfSecenek) pdfSecenek.click();
        
        console.log("Tüm işlemler başarıyla tamamlandı!");

    } catch (hata) {
        console.error("İşlem sırasında bir hata oluştu:", hata);
    }
}

// Kodu çalıştırmak için parametreleri girerek fonksiyonu çağırın:
// Örnek: islemleriOtomatizeEt('W-12345', 'NRWI-98765');
islemleriOtomatizeEt('BURAYA_IS_EMRI_NO_YAZIN', 'BURAYA_NRWI_NO_YAZIN');
