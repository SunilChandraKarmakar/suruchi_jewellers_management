import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderPrintModel } from 'src/app/models/order-print/order-print-model';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})

export class PrintOrderComponent implements OnInit {

  orderPrintModel: OrderPrintModel = new OrderPrintModel();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    const messageHandler = (event: MessageEvent) => {
      const data = event.data;
      this.orderPrintModel = data;
      this.cd.detectChanges();
  
      setTimeout(() => {
        this.printDiv();
      }, 100); // Delay of 100ms to ensure rendering
  
      // Remove the event listener after handling the first message
      window.removeEventListener('message', messageHandler);
    };
  
    window.addEventListener('message', messageHandler);
  }

  printDiv(): void {
    const printContent = document.getElementById('printableDiv')?.innerHTML;
  
    const printWindow = window.open('', '', 'width=800,height=600');
  
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <title>Print</title>
            <style>
              .order-number {
                background-color: whitesmoke;
                border: 1px dotted darkblue;
                text-align: center;
                padding: 5px 0px;
              }
              .date {
                background-color: whitesmoke;
                border: 1px dotted slategrey;
                text-align: center;
                padding: 5px 0px;
              }
              .card-footer {
                background-color: white !important;
              }
              @media print {
                body {
                -webkit-print-color-adjust: exact;
              }
              /* Set page size to Legal and landscape orientation */
                @page {
                  size: legal landscape;
                  margin: 10mm; /* Adjust margin as needed */
                }
              }
             </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
  
      printWindow.document.close();
  
      // Add a short delay before closing to allow the print dialog to appear
      printWindow.onload = () => {
        printWindow.print();
        
        // Set a timeout to close the window after the print dialog is triggered
        setTimeout(() => {
          printWindow.close();
        }, 500);  // Adjust timeout duration if necessary
      };
    }
  }
}