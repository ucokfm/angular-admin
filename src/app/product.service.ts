import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as io from 'socket.io-client';
import feathers, { Paginated, Service } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true,
});
const client = feathers();
client.configure(socketio(socket));

export interface Product {
  _id: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$: Observable<Product[]>;
  private observer: Observer<Product[]>;
  private products: Product[];
  private service: Service<Product>;

  constructor() {
    this.products$ = new Observable(observer => {
      this.observer = observer;
    });
    this.products = [];
    this.service = client.service('products');
    this.service.on('created', product => {
      this.products.push(product);
      this.observer.next([...this.products]);
    });
    this.service.on('updated', product => {
      const index = this.products.findIndex(item => item._id === product._id);
      this.products[index] = product;
      this.observer.next([...this.products]);
    });
  }

  find() {
    this.service.find().then((result: Paginated<Product>) => {
      this.products = result.data;
      this.observer.next([...result.data]);
    });
  }
}
