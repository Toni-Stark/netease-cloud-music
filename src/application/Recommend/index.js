import React, { useEffect } from 'react';
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list';
import Slider from '../../components/slider';
import { forceCheck } from 'react-lazyload';
import Loading from "../../baseUI/loading";
import Scroll from '../../baseUI/scroll';
import { connect } from 'react-redux';
import { Content } from './style'

function Recommend (props) {
    const { bannerList, recommendList, enterLoading } = props;
    
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        if (!bannerList.size){
            getBannerDataDispatch ();
        }
        if (!recommendList.size){
            getRecommendListDataDispatch ();
        }
    }, [bannerList.size, getBannerDataDispatch, getRecommendListDataDispatch, recommendList.size]);

    const recommendListJS = recommendList ? recommendList.toJS() : [];
    const bannerListJS = bannerList ? bannerList.toJS() : [];

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS} />
                </div>
            </Scroll>
            { enterLoading ? <Loading /> : null }
        </Content>
    )
}

const mapStateToProps = (state) => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    enterLoading: state.getIn (['recommend', 'enterLoading']),
    recommendList: state.getIn(['recommend', 'recommendList']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch(){
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch(){
            dispatch(actionTypes.getRecommendList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
