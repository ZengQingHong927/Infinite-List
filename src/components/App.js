import          React                           from 'react';
import        { Fragment }                      from 'react';
import        { BrowserRouter }                 from 'react-router-dom';
import        { Route }                         from 'react-router-dom';

import        { Suspense }                      from 'react';
import          LinearProgress                  from '@material-ui/core/LinearProgress';
import        { store }                         from '../redux/store';
import        { Provider }                      from 'react-redux';
import                                          '../css/app.css';

var     Landing                         = React.lazy (() => import ('../components/Landing/Landing'));
var     InfiniteList                    = React.lazy (() => import ('../components/InfiniteList/InfiniteList'));



function App (props) {
        return (
                <Provider store={store}>
                <Fragment>
                        <div className='container'>
                                <BrowserRouter>
                                        <Suspense fallback={<LinearProgress />}>
                                                <Route path='/' exact                            component={Landing} />
                                                <Route path='/infinite-list' exact               component={InfiniteList} />
                                        </Suspense>
                                </BrowserRouter>
                        </div>
                </Fragment>
                </Provider>
        );
}

export default App;
