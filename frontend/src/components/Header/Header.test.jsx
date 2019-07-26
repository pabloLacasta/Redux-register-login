import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {Header} from './Header.jsx';//Pillamos el header solo porque así no intenta encontrarlo en la store , ya que es así como se está exportando en el archivo Header.jsx
import {StaticRouter} from 'react-router-dom';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('How the Header component renders', ()=> {//puedes hacer tantos describes como quieras
    it('should render profile and logout if user props are given', () => {
        const headerMounted = Enzyme.mount(<StaticRouter><Header user={{}}/></StaticRouter>);//Como el header original tiene rutas en la app y hay que aislarlo para hacer el test es necesario envolverlo en el StaticRouter
        expect(headerMounted.find('.isLoggedIn').length).toBe(1)//find nos busca 
        expect(headerMounted.find('.navbarLogout').length).toBe(0);

        headerMounted.unmount();//para hacer el test icocuo, que no afecte a los test que hagamos en el futuro
    });
    it('should render register and login if user props are not given', () => {
        const headerMounted = Enzyme.mount(<StaticRouter><Header user={undefined}/></StaticRouter>);
        expect(headerMounted.find('.isLoggedIn').length).toBe(0)//find nos busca 
        expect(headerMounted.find('.navbarLogout').length).toBe(1);

        headerMounted.unmount();
    });
});