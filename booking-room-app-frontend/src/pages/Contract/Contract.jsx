import './contractStyle.scss';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { deleteContract, getContractByUserId } from "../../APIs";
import { timeAndDate } from '../../helpers/timeFront';
import { formatMoneyStyle1 } from '../../helpers/formatMoney';

export default function Contract() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [contractList, setContractList] = useState();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('isLogin') || !user.token)) {
      alert("Please Sign In!");
      navigate('/');
      return;
    }
    fetchAPI();
  }, []);

  const handleDelete = async (contractId) => {
    await deleteContract(contractId);
    fetchAPI();
  }
  const fetchAPI = async () => {
    let response = await getContractByUserId(user.id, user.token);
    if (response.status === 404) {
      alert(response.message);
      return;
    }
    setContractList(response.data);
  }

  return (
    <div className="Contract">
      <div className="container d-flex flex-wrap">
        {
          contractList?.length !== 0 ? (
            contractList?.map(contract =>
              <div className="col-xxl-4 col-xl-6 col-12 object-fit-contain px-sm-3 px-1 py-3 contract_item " key={`contract-${contract.id}`}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-lg-row gap-sm-2 flex-column">
                    <div className="d-flex gap-1 fw-medium text-success">
                      <p>Room .</p>
                      <p>{contract.Room.id}</p>
                    </div>
                    <div className="d-flex gap-1">
                      <p>Price:  </p>
                      <p className="fw-sm-bolder text-warning">{formatMoneyStyle1(contract.Room.price)}đ</p>
                    </div>
                  </div>
                  <div className="d-flex  flex-lg-row flex-column gap-sm-2">
                    <p className="time d-flex align-items-end">{timeAndDate(contract.createdAt)}</p>
                    <p className="fw-sm-medium text-primary">#{contract.id}</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-column flex-md-row gap-md-2 gap-1 mt-2">
                  <div className="col-md-5 col-sm-5 col-12 rounded-3 overflow-hidden">
                    <img src={contract.Room.Photos[0].link}
                      alt=""
                      className='w-100 h-100 '
                    />
                  </div>

                  <div className="col d-flex flex-column gap-sm-1">
                    <div>
                      <div className="d-flex gap-sm-1 text-infor">
                        <p>Name: </p>
                        <p className="fw-medium text-dark">{contract.User.name}</p>
                      </div>
                      <div className="d-flex gap-sm-1 text-infor">
                        <p>Email: </p>
                        <p className="fw-medium text-dark">{contract.User.email}</p>
                      </div>
                      <div className="d-flex gap-sm-1 text-infor">
                        <p>Phone: </p>
                        <p className="fw-medium text-dark">{contract.User.phone}</p>
                      </div>
                      <div className="d-flex gap-sm-1 text-infor">
                        <p>Total: </p>
                        <p className="fw-medium text-danger fst-italic">{formatMoneyStyle1(contract.sumMoney)}đ</p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className=" d-flex gap-1">
                        <div className="btn btn-outline-info d-flex align-items-center flex-wrap object-fit-contain py-1 px-2 duration">
                          {
                            `${contract.startDate} -> ${contract.endDate}`
                          }
                        </div>
                        <button onClick={() => handleDelete(contract.id)}
                          className="btn btn-outline-danger py-1 px-2">Cancle</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
            <div>You don't have any contracts</div>
          )
        }

      </div>
    </div>
  )
}
