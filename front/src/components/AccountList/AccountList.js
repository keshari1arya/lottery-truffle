import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LotteryService from '../../services/service';

function AccountList() {

    const [winners, setWinners] = useState([]);

    const getWinnerHandler = async () => {
        var winners = await LotteryService.getWinnerList();
        var data = winners.map((record, index) => {
            return (
                <div>
                    <h4 className="secton-title text-center">Spin {record.spin}</h4>
                    {
                        record.winners.map((winner, index) => {
                            return (
                                <div className="feature-content">
                                    <h4 className="feature-title mt-0">{winner.position}</h4>
                                    <p className="text-sm mb-0">{winner.address}</p>
                                    <p className="text-sm mb-0">{winner.amount}</p>
                                </div>)
                        })

                    }
                </div>
            )
        })
        setWinners(data);
    }

    useEffect(async () => {
       await  getWinnerHandler()
    })

    return (
        <div className="container">
            <h2 className="section-title mt-0 text-center">Winners</h2>
            <div className="features-inner section-inner has-bottom-divider">
                <div className="features-wrap">
                    <div className="feature">
                        <div className="feature-inner">
                            {
                               winners
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

AccountList.propTypes = {};

AccountList.defaultProps = {};

export default AccountList;
