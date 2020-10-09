import          React                           from 'react';
import        { Fragment }                      from 'react';
import        { BrowserRouter }                 from 'react-router-dom';
import        { Route }                         from 'react-router-dom';

import        { Suspense }                      from 'react';
import          LinearProgress                  from '@material-ui/core/LinearProgress';
import                                          '../css/app.css';

var     InfiniteList                    = React.lazy (() => import ('../components/InfiniteList/InfiniteList'));



function App (props) {
        return (
                <Fragment>
                        <div className='container'>
                                <BrowserRouter>
                                        <Suspense fallback={<LinearProgress />}>
                                                <Route path='/infinite-list' exact               component={InfiniteList} />
                                        </Suspense>
                                </BrowserRouter>
                        </div>
                </Fragment>
        );
}

export default App;
