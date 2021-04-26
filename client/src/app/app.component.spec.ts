import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // this.httpClient.get(`http://localhost:8081/temperature/${product.id}`)
  it('should get the temperature of the product with id 1', () => {

    const mockProd = {
      id: '1',
      name: 'Pilsner',
      minimumTemperature: 4,
      maximumTemperature: 6,
    };

    const mockProdTemp = {
      id:"1",
      temperature:7
    }

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getTemperatureOfProduct(mockProd)
        .subscribe(result => {
          expect(result.id).toEqual("1");
          expect(result.name).toEqual('Pilsner');
          expect(result.minimumTemperature).toEqual(4);
          expect(result.maximumTemperature).toEqual(6);
          expect(result.temperature).toEqual(7);
        })

    const req = httpTestingController.expectOne('http://localhost:8081/temperature/1');
    req.flush(mockProdTemp);
  });

  // this.httpClient.get(`http://localhost:8081/temperature/${product.id}`)
  it('should load the data', async () => {
    var mockProds = [{
      id: '1',
      name: 'Pilsner',
      minimumTemperature: 4,
      maximumTemperature: 6,
    },
    {
      id: '2',
      name: 'IPA',
      minimumTemperature: 5,
      maximumTemperature: 6,
    }];

    const mockProdTemp_1 = { id: "1", temperature: -1 }
    const mockProdTemp_2 = { id: "2", temperature: 2 }

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.loadData(mockProds);

    const req1 = httpTestingController.expectOne('http://localhost:8081/temperature/1');
    req1.flush(mockProdTemp_1);
    const req2 = httpTestingController.expectOne('http://localhost:8081/temperature/2');
    req2.flush(mockProdTemp_2);

    // data length
    expect(Object.keys(app.data).length).toEqual(2);
    // product id : 1
    expect(app.data[1].id).toEqual("1");
    expect(app.data[1].name).toEqual('Pilsner');
    expect(app.data[1].temperature).toEqual(-1);
    // product id :2 1
    expect(app.data[2].id).toEqual("2");
    expect(app.data[2].name).toEqual('IPA');
    expect(app.data[2].temperature).toEqual(2);
  });

  // this.httpClient.get(`http://localhost:8081/temperature/${product.id}`)
  it('should the data on invoking ngInit()', async () => {
    const mockProdTemp_1 = { id: "1", temperature: -1 };
    const mockProdTemp_2 = { id: "2", temperature: 2 };
    const mockProdTemp_3 = { id: "3", temperature: 3 };
    const mockProdTemp_4 = { id: "4", temperature: 3 };
    const mockProdTemp_5 = { id: "5", temperature: -2 };
    const mockProdTemp_6 = { id: "6", temperature: 4 };

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();

    const req1 = httpTestingController.expectOne('http://localhost:8081/temperature/1');
    req1.flush(mockProdTemp_1);
    const req2 = httpTestingController.expectOne('http://localhost:8081/temperature/2');
    req2.flush(mockProdTemp_2);
    const req3 = httpTestingController.expectOne('http://localhost:8081/temperature/3');
    req3.flush(mockProdTemp_3);
    const req4 = httpTestingController.expectOne('http://localhost:8081/temperature/4');
    req4.flush(mockProdTemp_4);
    const req5 = httpTestingController.expectOne('http://localhost:8081/temperature/5');
    req5.flush(mockProdTemp_5);
    const req6 = httpTestingController.expectOne('http://localhost:8081/temperature/6');
    req6.flush(mockProdTemp_6);

    // data length
    expect(Object.keys(app.data).length).toEqual(6);
    // product id : 1
    expect(app.data[1].id).toEqual("1");
    expect(app.data[1].name).toEqual('Pilsner');
    expect(app.data[1].temperature).toEqual(-1);
    // product id : 2
    expect(app.data[2].id).toEqual("2");
    expect(app.data[2].name).toEqual('IPA');
    expect(app.data[2].temperature).toEqual(2);
    // product id : 3
    expect(app.data[3].id).toEqual('3');
    expect(app.data[3].name).toEqual('Lager');
    expect(app.data[3].temperature).toEqual(3);
    // product id : 4
    expect(app.data[4].id).toEqual('4');
    expect(app.data[4].name).toEqual('Stout');
    expect(app.data[4].temperature).toEqual(3);
    // product id : 5
    expect(app.data[5].id).toEqual('5');
    expect(app.data[5].name).toEqual('Wheat beer');
    expect(app.data[5].temperature).toEqual(-2);
    // product id : 6
    expect(app.data[6].id).toEqual('6');
    expect(app.data[6].name).toEqual('Pale Ale');
    expect(app.data[6].temperature).toEqual(4);
  });
});
