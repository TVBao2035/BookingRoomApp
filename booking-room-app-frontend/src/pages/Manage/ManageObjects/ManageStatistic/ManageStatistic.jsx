import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import {Bar, Pie} from 'react-chartjs-2'
import { getAllHistory, getRevenueOfAllRoomsEachMonth, getRevenueOfEachRoom } from '../../../../APIs';
import listColor from '../../../../helpers/listColor';
export default function ManageStatistic() {
    const [listHistories, setListHistories] = useState([]);
    const [revenueEachMonth, setRevenueEachMonth] = useState([]);
    const checkColorPie = listColor.map(()=> false);
    const [year, setYear] = useState(2024)
   const handleChange = (e) => {
       revenueOfAllRoomsEachMonthAPI(e.target.value);
       setYear(e.target.value);
   }
    const revenueOfAllRoomsEachMonthAPI = async (year) => {
        let response = await getRevenueOfAllRoomsEachMonth(year);
        if (response.status === 200) {
            console.log(response.data);
            setRevenueEachMonth(response.data);
        } else {
            alert(response.message);
        }
    }
    const revenueOfEachRoomAPI = async () => {
        let response = await getRevenueOfEachRoom();
        if(response.status === 200) {
            setListHistories(response.data);
        }else{
            alert(response.message);
        }
    }

    useEffect(()=> {
        revenueOfAllRoomsEachMonthAPI(year);
        revenueOfEachRoomAPI();
    }, []);
  return (
    <div>
        <div className='d-flex justify-content-around'>
            <div style={{height: "500px", width: "500px"}}>
                <Pie
                    height={200}
                    width={200}
                    data={
                        {
                            labels: listHistories.map(history => history.title),
                            datasets: [
                                {
                                    
                                    data: listHistories.map(history => history.sumMoney),
                                    backgroundColor: listHistories.map(()=> {
                                        let index;
                                        do{
                                            index = parseInt(Math.random() * 10);
                                            if(!checkColorPie[index]){
                                                checkColorPie[index]= true;
                                                return listColor[index]
                                            }
                                           
                                        }while(checkColorPie[index])
                                    }),
                                    
                                }, 
                            ],                                                    
                        }
                    }
                    options={
                        {
                            radius: 200,
                        }
                    }
                />
                <div className='text-center'>Revenue All Rooms</div>
            </div>
            <div  >
                <Bar
                    height={495}
                    width={600}
                    data={
                        {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: revenueEachMonth.map((item, index) => {
                                if(item !== null){
                                    return {
                                        label: item?.title,
                                        data: item.sumMoneyOfEachMonth,
                                        backgroundColor: listColor[index],
                                    }
                                }
                            })
                        }
                    }
                /> 
                <div className='d-flex justify-content-center gap-1 align-items-center'>
                    <p>Revenue Each Months Of </p>
                    <input 
                        type="number" 
                        style={{width: "100px"}} 
                        className='form-control px-2 py-1 pe-auto' 
                        onChange={e => handleChange(e)} 
                        value={year} 
                    />
                </div>
            </div>
        </div>

          <div className='d-flex'>
            <div>
                <div>ManageStatistic</div>
            </div>
           
          </div>
    </div>
  )
}
