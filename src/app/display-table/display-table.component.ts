import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.css'
})
export class DisplayTableComponent implements OnInit {
  i:any = 0
  products!: any[];
  value1:any;
  index:any
  selection:any 

  // ngOnChanges(changes: SimpleChanges) {
  //   // Esta función se ejecutará cada vez que se actualice el valor del input
  //   window.alert("Usa la otra")
  // }

  displayUnitaryPrice(product: any){
    // window.alert(JSON.stringify(product))
    // return JSON.stringify(product)
    product.currentUnitaryPrice = this.getPriceForQty(JSON.parse(product.prices),product.qty)
    // window.alert(this.getPriceForQty(product.prices,product.qty))
  }


  getPriceForQty(arr: any, qty: any) {
    // window.alert(arr)
    let resultPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        // const currentQty = parseInt(arr[i].qty);
        const currentQty = arr[i].qty;
        window.alert(currentQty)
        if (currentQty >= qty) {
            resultPrice = arr[i].price;
            break;
        }
    }
    return resultPrice;
}
  async addProduct(ref:string){
    let newRef = await getSingleProduct(ref)
    this.products.push(newRef[0])
    // window.alert(JSON.stringify(newRef))
    this.i++
  }
  deleteProduct(id:any){
    this.products =  this.products.filter(item => item.id != id);
    console.log(JSON.stringify(this.products))
  }
  async ngOnInit() {
          let index1 = await getProductIndex()
          this.index = transformChildrenToJson(index1)

          console.log(index1)
          console.log(this.index)
          this.products = []
        ;
}
}

async function getProductIndex() {
  const url = `https://digital.wearekingly.com/internal/end/productIndex`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'GET', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });

      const data = await response.json();

      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}

async function getSingleProduct(ref: string) {
  const url = `https://digital.wearekingly.com/internal/ref/${ref}`; // The URL for the API endpoint

  try {
          const response = await fetch(url, {
          method: 'GET', // Using the HTTP POST method
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'auth': 'Galatea'
          },
      });

      const data = await response.json();

      return data; // Return the data
  } catch (error) {
      console.error('Error:', error); // Log any errors that occur during the fetch operation
      throw error; // You can choose to handle the error here or let it propagate to the calling code
  }
}



interface OriginalCategory {
  key: string;
  label: string;
  data: any;
  children: OriginalProduct[];
}

interface OriginalProduct {
  key: string;
  label: string;
  data: string | null;
}

interface TransformedChild {
  name: string;
  code: string;
}

function transformChildrenToJson(data: OriginalCategory[]): TransformedChild[] {
  let transformedChildren: TransformedChild[] = [];

  data.forEach(category => {
      category.children.forEach(product => {
          let name = product.label; // Extracting name from label
          let code = product.data || ""; // Using product data as code, empty string if null
          transformedChildren.push({ name, code });
      });
  });

  return transformedChildren;
}