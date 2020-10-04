import          React                           from 'react';
import        { useEffect }                     from 'react';
import        { useState }                      from 'react';
import        { Fragment }                      from 'react';
import        { useRef }                        from 'react';
import          makeStyles                      from '@material-ui/core/styles/makeStyles';
import          PerfectScrollbar                from 'react-perfect-scrollbar';
import                                          '../../../node_modules/react-perfect-scrollbar/dist/css/styles.min.css';
import          Faker                           from 'faker';

function InfiniteList (props) {
        let     classes         = useStyles ();
        let     refList         = useRef (null);

        let     itemSize        = 110;
        let     screenHeight    = document.documentElement.clientHeight || document.body.clientHeight;
        let     visibleCount    = Math.floor (screenHeight / itemSize);
        
        let   [ listData, setListData ]         = useState ([]);
        let   [ visibleData, setVisibleData ]   = useState ([]);
        let   [ startOffset, setStartOffset ]   = useState (0);
        let   [ startIndex, setStartIndex ]     = useState (0);
        let   [ endIndex, setEndIndex ]         = useState (startIndex + visibleCount);
        let   [ listHeight, setListHeight ]     = useState (0);


        useEffect (initListData, []);


        function handleScroll (e) {
                // 當前滾動位置
                console.log (`scroll`)
                let     scrollTop       = e.target.scrollTop;
        
                let     startidx        = Math.floor (scrollTop / itemSize);
                let     endidx          = startidx + visibleCount;
                let     offset          = scrollTop - (scrollTop % itemSize);
                // console.log (offset);
                // console.log (startidx);
                // console.log (endidx);
                if (endidx >= listData.length-1) {
                        let     fetchDataList = getTenDataList ();
                        // console.log('new fetch')
                        // console.log (fetchDataList)
                        setListHeight (prev => (prev+fetchDataList.length*itemSize));
                        setListData (prev => ([...prev, ...fetchDataList]));
                        setVisibleData ([...listData, ...fetchDataList].slice (startidx, Math.min (endidx, [...listData, ...fetchDataList].length-1)));
                }
                console.log(listHeight)

                setStartIndex (startidx);
                setEndIndex (endidx);
                setStartOffset (offset);
        }

        function scrollToTop (e) {
                e.stopPropagation ();
                
                let     curr    = refList.current;
                // curr.scrollTop  = 0;
                curr.scrollTo({
                        top:            0,
                        left:           0,
                        behavior:       'smooth'
                })

        }

        function getTenDataList () {

                if (listData.length > 200)      return [];
                
                return new Array (10).fill ({}).map (item => ({
                        id:             Faker.random.uuid (),
                        title:          Faker.name.title (),
                        content:        Faker.random.words (),
                }));
        }

        function initListData () {
                let     fetchDataList = getTenDataList ();
                setListHeight (itemSize*fetchDataList.length);
                setListData (fetchDataList);
                setVisibleData (fetchDataList.slice (startIndex, Math.min (endIndex, fetchDataList.length)))
        }

        return (
                <Fragment>
                        <div className={classes.root} onScroll={handleScroll}>
                                {endIndex > 20 && <div className={classes.scrollToBtn} onClick={scrollToTop}>回到頂部</div>}
                                <PerfectScrollbar containerRef={el => (refList.current = el)} component="div">
                                        <div style={{height: `${listHeight}px`}}>
                                                <div className={classes.infiteList} style={{transform: `translate3d(0, ${startOffset}px, 0)`}}>
                                                        {visibleData.map (item => {
                                                                return (
                                                                        <Fragment key={item.id}>
                                                                                <div className={classes.item}>
                                                                                        <div className={classes.leftSection} style={{height: `${itemSize}px`, lineHeight: `${itemSize}px`}}>
                                                                                                <div >{item.title[0]}</div>
                                                                                        </div>
                                                                                        <div className={classes.rightSection}>
                                                                                                <div className='item-title'>
                                                                                                        <div >{item.title}</div>
                                                                                                </div>
                                                                                                <div className='item-content'>
                                                                                                        <div >{item.content}</div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </Fragment>
                                                                );
                                                        })}
                                                        
                                                </div>
                                        </div>
                                </PerfectScrollbar>
                        </div>
                </Fragment>
        );

}

var useStyles = makeStyles ((theme) => ({
        root: {
                height:                 '100vh',
                position:               'relative',
        },
        item: {
                display:                'flex',
                margin:                 '10px 0',
                backgroundColor:        '#fff',
                borderRadius:           '10px',

        },
        leftSection: {
                borderRadius:           '10px',
                width:                  '70px',
                height:                 '100%',
                backgroundColor:        '#38c5e4',
                textAlign:              'center'
        },
        rightSection: {
                padding:                '5px',
                width:                  '200px',
                height:                 '100%',
        },
        scrollToBtn: {
                position:               'fixed',
                borderRadius:           '50%',
                fontSize:               '12px',
                color:                  'white',
                background:             '#edc988',
                bottom:                 '101px',
                right:                  '20px',
                zIndex:                 10000,
                width:                  '50px',
                height:                 '50px',
                textAlign:              'center',
                lineHeight:             '50px',
        }
}));

export default InfiniteList;