import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

// import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qrkidschurch',
  templateUrl: './qrkidschurch.page.html',
  styleUrls: ['./qrkidschurch.page.scss'],
})
export class QRKidschurchPage implements OnInit {
  BarcodeResults: any;
  scannedData: any;
  encodedData: '';
  encodeData: any;

  constructor() { }

  ngOnInit() {
//  this.goToBarcodeScan();
//     }
  
//     goToBarcodeScan() {
//       const options: BarcodeScannerOptions = {
//         preferFrontCamera: true,
//         showFlipCameraButton: true,
//         showTorchButton: true,
//         torchOn: false,
//         prompt: 'Place a barcode inside the scan area',
//         resultDisplayDuration: 500,
//         formats: 'QR_CODE,PDF_417 ',
//         orientation: 'landscape',
//       };
  
//       this.barcodeCtrl.scan(options).then(barcodeData => {
//         console.log('Barcode data', barcodeData);
//         this.scannedData = barcodeData;
//         this.router.navigate[("/kids-church-check-in")]
  
//       }).catch(err => {
//         console.log('Error', err);
//       });
    }

  
  }
