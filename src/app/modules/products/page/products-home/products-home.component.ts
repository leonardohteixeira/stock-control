import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';


@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
private readonly destroy$: Subject<void> = new Subject();
public productsDatas: Array<GetAllProductsResponse> = [];

constructor(
  private productsService: ProductsService,
  private ProductsDataTransferService: ProductsDataTransferService,
  private router: Router,
  private messageService: MessageService,
) {}
  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.ProductsDataTransferService.getProductsDatas();

    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded;
      console.log('DADOS DE PRODUTOS', this.productsDatas);
    } else this.getAPIProductsDatas();

  }

  getAPIProductsDatas() {
    this.productsService
    .getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.productsDatas = response;
          console.log('DADOS DE PRODUTOS', this.productsDatas);
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 2500,
        })
        this.router.navigate(['/dashboard']);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
