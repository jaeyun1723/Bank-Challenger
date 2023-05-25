import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import './CreateGoal.css';
import Connection from './Connection';

// Instantiate axios with a base URL
const api = axios.create({
    baseURL: "http://localhost:8080",  // Replace this with the actual server URL
});

function CreateGoal({ setIsOpen }) {
    const [inputMode, setInputMode] = useState('manual');
    const [userId, setUserId] = useState("2");
    const [category, setCategory] = useState("");
    const [goalName, setGoalName] = useState("");
    const [productId, setProductId] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [savingAmount, setSavingAmount] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    const [day, setDay] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [goalImage, setGoalImage] = useState("#000000");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null); // Added state to store the selected search result

    const handleColorChange = (e) => {
        setGoalImage(e.target.value);
    };

    const handleChange = (e) => {
        setGoalAmount(e.target.value);
    };


    const searchResultsContainerStyle = {
        maxHeight: '300px',
        overflowY: 'auto',
    };

    const resetInputValues = () => {
        setGoalName("");
        setGoalAmount("");
        setSavingAmount("");
        setDay("");
        setStartDate(null);
        setGoalImage(null);
        setProductId("");
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.get('/goal/search', { params: { query: searchQuery } });
            setSearchResults(response.data.items);
            console.log(response.data.items);
            // Assuming the response data has a field 'items' that contains the search results
        } catch (err) {
            console.error(err);
        }
    };

    const handleManualButtonClick = () => {
        setInputMode('manual');
        resetInputValues();
    };

    const handleSearchButtonClick = () => {
        setInputMode('search');
        resetInputValues();
    };



    const searchResultImageStyle = {
        width: '80px',
        height: '80px',
    };

    const handleResultSelect = (result) => {
        // When a user selects a search result, set the goalAmount and goalImage accordingly.
        setGoalAmount(result.lprice);
        setProductId(result.productId);
        setSelectedResult(result); // Store the selected result
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProductId("");
        const data = {
            userId,
            category,
            goalName,
            productId,
            goalAmount,
            savingAmount,
            isExpired,
            day,
            savingStartDate: startDate.toISOString(),
            createDate: new Date().toISOString(),
            goalImage
        };
        console.log(data);
        try {
            const response = await api.post("/goal", data);
            console.log("Goal created successfully:", response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error creating goal:", error);
        }
    };

    if (isSubmitted) {
        return <Connection />;
    }

    return (
        <>
            <h1 style={{textAlign:"center", margin: "20px 20px"}}>목표 생성하기</h1>
            <button onClick={handleManualButtonClick} style={{ marginRight: "2%", width: "49%", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}>직접 입력</button>
            <button onClick={handleSearchButtonClick} style={{ width: "49%", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}>검색하여 입력</button>

            {inputMode === 'manual' ? (
                <form className="create-goal" onSubmit={handleSubmit}>
                    <label>
                        목표 이름
                        <input
                            type="text"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            required
                            style={{marginLeft: "60px",width: "300px", height: "40px", padding: "0.8rem", border: "3px solid #ccc", alignItems: "flex-end", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}
                        />
                    </label>
                    <label>
                        목표 금액
                        <input type="text" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required style={{marginLeft: "60px",width: "300px",height: "40px",padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}
                        />
                    </label>
                    <label>
                        자동이체 금액(달)
                        <input type="text" value={savingAmount} onChange={(e) => setSavingAmount(e.target.value)} required style={{marginLeft: "18px",width: "300px", height: "40px",padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}
                        />
                    </label>
                    <label>
                        자동이체 날짜(일)
                        <input type="number" value={day} onChange={(e) => setDay(e.target.value)} required style={{marginLeft: "18px",width: "300px", padding: "0.8rem", height: "40px",border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}
                        />
                    </label>
                    <label className="input-label">
                        목표 시작일
                        <div className="input-container">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date()}
                                required
                                className="custom-datepicker"
                            />
                        </div>
                    </label>

                    <label>
                        테마색
                        <input type="color" value={goalImage} onChange={handleColorChange} required style={{marginLeft: "80px"}}/>
                    </label>
                    <button type="submit">목표 만들기</button>
                </form>
            ) : (
                <form className="create-goal" onSubmit={handleSubmit}>
                    <label>
                        목표 금액
                        <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} required style={{marginLeft: "60px",width: "300px", height: "40px",padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}/>
                    </label>
                    <label>
                        자동이체 날짜(일)
                        <input type="number" value={day} onChange={(e) => setDay(e.target.value)} required style={{marginLeft: "15px",width: "300px", height: "40px",padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}/>
                    </label>
                    <label className="input-label">
                        목표 시작일
                        <div className="input-container">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date()}
                                required
                                className="custom-datepicker"
                            />
                        </div>
                    </label>
                    <label>
                        자동이체 금액(달)
                        <input type="text" value={savingAmount} onChange={(e) => setSavingAmount(e.target.value)} required style={{marginLeft: "18px",width: "300px",height: "40px", padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}/>
                    </label>
                    <label>
                        검색하기
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                            style={{marginLeft: "65px", width: "230px",height: "40px", padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}
                        />
                        <button type="button" onClick={handleSearchSubmit} style={{marginLeft:"10px", width: "50px", height: "25px", fontSize: "12px", padding: "6px 12px", backgroundColor:"gray"}}>검색</button>
                    </label>
                    {searchResults.length > 0 && (
                        <div style={{ ...searchResultsContainerStyle, display: selectedResult ? 'none' : 'block' }}>
                            <ul>
                                {searchResults.map((result) => (
                                    <li key={result.productId} onClick={() => handleResultSelect(result)}>
                                        <div className={`search-result ${selectedResult === result ? 'selected' : ''}`}>
                                            <div className="search-result-image">

                                                <img src={result.image} alt={result.title} style={{ width: '100px', height: '80px' }}/>
                      </div>
                                            <div className="search-result-details">
                                                <p>상품명: {result.title}</p>
                                                <p>가격: {result.lprice}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedResult && (
                        <>
                            <label>
                                목표 금액
                                <input type="text" value={goalAmount} onChange={handleChange} style = {{marginLeft: "60px", width: "230px",height: "40px", padding: "0.8rem", border: "3px solid #ccc", borderRadius: "30px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}/>

                            </label>

                        </>
                    )}

                    <label>
                        테마 색상
                        <input type="color" value={goalImage} onChange={handleColorChange} required style={{marginLeft: "70px"}}/>
                    </label>
                    <button type="submit">목표 만들기</button>
                </form>
            )}
        </>
    );
}

export default CreateGoal;