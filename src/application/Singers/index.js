import React, {useEffect, useState} from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import {List, ListContainer, ListItem, NavContainer} from "./style";
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/actionCreators';
import Scroll from './../../baseUI/scroll/index';
import {connect} from 'react-redux';
import Loading from '../../baseUI/loading';
import  LazyLoad, {forceCheck} from 'react-lazyload';

function Singers (props) {
    const { pageCount, pullUpLoading, pullDownLoading, enterLoading } = props;
    const { updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch, getHotSingerDispatch } = props;

    let [category, setCategory] = useState ('');
    let [alpha, setAlpha] = useState ('');
    
    useEffect(() => {
        getHotSingerDispatch();
    }, [getHotSingerDispatch])
    
    let handleUpdateAlpha = (val) => {
        setAlpha (val);
        updateDispatch(category, val);
    }

    let handleUpdateCatetory = (val) => {
        setCategory (val);
        updateDispatch(val, alpha);
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch (category, alpha, category === '', pageCount);
    };

    const handlePullDown = () => {
        pullDownRefreshDispatch (category, alpha);
    };

    const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
        return {
            picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
            name: "隔壁老樊",
            accountId: 277313426,
        }
    });
    
    const renderSingerList = () => {
        return (
            <List>
                {
                    singerList.map ((item, index) => {
                        return (
                            <ListItem key={item.accountId+""+index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    return (
        <div>
            <NavContainer>
                <Horizen list={categoryTypes}
                         title={"分类 (默认热门):"}
                         handleClick={handleUpdateCatetory}
                         oldVal={category} />
                <Horizen list={alphaTypes}
                         title={"首字母:"}
                         handleClick={val => handleUpdateAlpha (val)}
                         oldVal={alpha} />
            </NavContainer>
            <ListContainer>
                {enterLoading ? <Loading /> :
                    <Scroll
                        onScroll={forceCheck}
                        pullUp={ handlePullUp }
                        pullDown = { handlePullDown }
                        pullUpLoading = { pullUpLoading }
                        pullDownLoading = { pullDownLoading }
                    >
                        { renderSingerList () }
                    </Scroll> }
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
            dispatch(getSingerList(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDispatch(category, alpha, hot, count) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count+1));
            if(hot){
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//属于重新获取数据
            if(category === '' && alpha === ''){
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));