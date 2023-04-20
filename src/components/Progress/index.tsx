import React from 'react';
import PropTypes from 'prop-types';
import { FC, ReactNode,useState } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import ScrollTable from '@/content/Knowledge/Statiscs/ScrollTable';
import { Grid } from '@mui/material';

interface ProgressProps {
    children?: ReactNode;
    nums: number,
    index: Number,
    progressColor: string
};

const Progresses:FC<ProgressProps> = ({nums,index,progressColor}) => {

    console.log(nums,index,progressColor)

    // const renderProgress=()=>{
    //     const progressItemStyle = {
    //        //  进度条的进度分成100份
    //         width: `${100/nums}%`,
    //         height: '100%'
    //     };
    //     var ele = [];
    //     for (var i = 0; i < nums; i++) {
    //         if (i <= index) {
    //             ele.push(
    //                 <div style={Object.assign(progressItemStyle, {backgroundColor: progressColor})} key={i}></div>
    //             )
    //         }
    //         // else {
    //         //     ele.push(
    //         //         <div style={progressItemStyle} key={i}></div>
    //         //     )
    //         // }
    //     }
    //     return ele;
    // };

    // const progressStyle = {
    //     display: '-webkit-flex',
    //     color: progressColor,
    //     // margin: '0 25px'
    // };
    
    // //  进度条的样式
    // const progressArticleStyle = {
    //     height: '70%',
    //     border: '1px solid #B5D3FF',
    //     //  进度条的样式长度
    //     width: '100%',
    //     display: '-webkit-flex',
    //     borderRadius: 5,
    //     overflow: 'hidden',
    //     marginTop: 10,
    //     backgroundColor:'#B5D3FF',
    //     marginLeft:-25
    // };

    // return (
    //     <div style={progressStyle}>
    //         <Container>
    //             <Box style={progressArticleStyle}>
    //                 {renderProgress()}
    //             </Box>
    //         </Container>
    //     </div>
    // )


    return <>
        <Grid container>
            <Grid item xs={10}>
                <ScrollTable style={{ width: '100%', height: 300 }}/>

            </Grid>

            <Grid item xs={2}>
                <Scrollbars style={{ width: '100%', height: 300 }}>

                    <ScrollTable style={{ width: '100%', height: 300 }}/>
                    
                </Scrollbars>

            </Grid>

        </Grid>
        

        
    </>


}

Progresses.propTypes = {
    //  进度条需要区分的个数
    nums: PropTypes.number.isRequired,
    //  当前进度条所处的位置
    index: PropTypes.number.isRequired,
    //  进度条的颜色
    progressColor: PropTypes.string.isRequired
};

export default Progresses;