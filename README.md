# OTRIS Otomatik Arama ve PDF Yazdırma Betiği

Bu proje, THY Teknik OTRIS Document yönetim sistemindeki tekrarlayan arama ve PDF yazdırma işlemlerini otomatize eden bir Tampermonkey (Userscript) betiğidir.

## 🚀 Özellikler
* Sol ağaç menüsündeki onay kutusunu otomatik işaretler.
* Formdaki `İş Emri Numarası` ve `NRWI No` alanlarını otomatik doldurur.
* Çıkan sonucu seçerek "İşlemler" menüsünden "PDF olarak yazdır" komutunu tetikler.
* Sayfanın sağ alt köşesine eklediği şık bir buton ile kullanımı son derece basittir.

## 🛠 Kurulum
1. Tarayıcınıza [Tampermonkey](https://www.tampermonkey.net/) eklentisini kurun.
2. Bu depodaki `script.user.js` dosyasına tıklayın.
3. GitHub arayüzünde **"Raw"** butonuna basın.
4. Tampermonkey kurulum ekranı otomatik olarak açılacaktır. **"Kur (Install)"** butonuna tıklayarak kurulumu tamamlayın.
* Aramayı başlatır ve sonuçların yüklenmesini bekler.

## 💻 Kullanım
1. OTRIS sistemine giriş yapın ve ilgili arama sayfasına gidin.
2. Sayfanın sağ alt köşesinde **"Otomatik PDF Al"** adında mavi bir buton göreceksiniz.
3. Butona tıklayın. Sistem size sırasıyla **İş Emri Numarası** ve **NRWI Numarası** soracaktır.
4. Bilgileri girip onayladıktan sonra arkanıza yaslanın, sistem işlemleri sizin yerinize sırasıyla yapacaktır.

## ⚠️ Önemli Not
Sisteminizin ve ağınızın hızına bağlı olarak arama sonuçlarının gelme süresi değişebilir. Eğer script arama yaptıktan sonra sonuçları seçemeden kapanıyorsa, `script.user.js` içindeki `await bekle(3000);` değerini `5000` (5 saniye) olarak güncelleyebilirsiniz.
