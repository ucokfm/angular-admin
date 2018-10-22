import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
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
  zone: NgZone;
  products$: Subject<Product[]>;
  private products: Product[];
  private service: Service<Product>;

  constructor() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.products$ = new Subject();
    this.products = [];
    this.service = client.service('products');
    this.service.on('created', product => {
      this.zone.run(() => {
        this.products.push(product);
        this.products$.next(this.products);
      });
    });
    this.service.on('updated', product => {
      this.zone.run(() => {
        const index = this.products.findIndex(item => item._id === product._id);
        this.products[index] = product;
        this.products$.next(this.products);
      });
    });
  }

  find() {
    this.service.find().then((result: Paginated<Product>) => {
      this.products = result.data;
      this.products$.next(result.data);
    });
  }
}
