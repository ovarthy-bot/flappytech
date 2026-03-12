// ==UserScript==
// @name         OTRIS Otomatik Arama ve PDF Yazdırma
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  THY Teknik OTRIS sisteminde belirtilen iş emri ve NRWI numarası ile otomatik arama yapıp PDF yazdırma menüsünü tetikler.
// @author       [Kendi Adınız veya GitHub Kullanıcı Adınız]
// @match        https://terms.thyteknik.com/documents/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Sayfadaki asenkron işlemlerin tamamlanmasını beklemek için yardımcı fonksiyon
    const bekle = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function islemleriOtomatizeEt(workOrderDegeri, nrwiNoDegeri) {
        try {
            console.log("1. Ağaçtaki (jstree) onay kutusu kontrol ediliyor...");
            const treeCheckbox = document.querySelector('.jstree-icon.jstree-checkbox');
            if (treeCheckbox) treeCheckbox.click();

            await bekle(500);

            console.log("2. İş Emri Numarası giriliyor...");
            const workOrderInput = document.getElementById('workOrderNumber_miid10_ExtSearchForm');
            if (workOrderInput) {
                workOrderInput.value = workOrderDegeri;
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
            await bekle(3000); // Sistemin hızına göre bu süreyi artırabilirsiniz

            console.log("5. Listeden ilgili kayıt işaretleniyor (otrCBChk)...");
            const gridCheckbox = document.querySelector('.otrCBChk');
            if (gridCheckbox) gridCheckbox.click();

            await bekle(500);

            console.log("6. 'İşlemler' menüsü açılıyor...");
            const islemlerMenusu = Array.from(document.querySelectorAll('.ui-selectmenu-text'))
                                         .find(el => el.textContent.trim() === 'İşlemler');
            if (islemlerMenusu) islemlerMenusu.click();

            await bekle(1000);

            console.log("7. 'PDF olarak yazdır' seçeneğine tıklanıyor...");
            const pdfSecenek = Array.from(document.querySelectorAll('.ui-menu-item-wrapper'))
                                     .find(el => el.textContent.includes('PDF olarak yazdır'));
            if (pdfSecenek) pdfSecenek.click();
            
            console.log("Tüm işlemler başarıyla tamamlandı!");

        } catch (hata) {
            console.error("İşlem sırasında bir hata oluştu:", hata);
            alert("Otomasyon sırasında bir hata oluştu. Konsolu kontrol edin.");
        }
    }

    // Arayüze tetikleyici buton ekleme
    function butonEkle() {
        // Eğer buton zaten varsa tekrar ekleme
        if (document.getElementById('otris-oto-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'otris-oto-btn';
        btn.innerText = 'Otomatik PDF Al';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '999999';
        btn.style.padding = '12px 20px';
        btn.style.backgroundColor = '#013C5C'; // Kurumsal mavi renk
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = 'bold';
        btn.style.fontFamily = 'Arial, sans-serif';

        // Hover efekti
        btn.onmouseover = () => btn.style.backgroundColor = '#012a40';
        btn.onmouseout = () => btn.style.backgroundColor = '#013C5C';

        btn.onclick = () => {
            const isEmri = prompt("Lütfen İş Emri Numarasını girin:", "");
            if (!isEmri) return; // İptal edilirse durdur
            
            const nrwi = prompt("Lütfen NRWI Numarasını girin:", "");
            if (!nrwi) return; // İptal edilirse durdur
            
            islemleriOtomatizeEt(isEmri, nrwi);
        };

        document.body.appendChild(btn);
    }

    // Sayfa tamamen yüklendiğinde butonu yerleştir
    window.addEventListener('load', butonEkle);
    // Dinamik yüklemelere karşı 2 saniye sonra tekrar dene
    setTimeout(butonEkle, 2000);

})();
