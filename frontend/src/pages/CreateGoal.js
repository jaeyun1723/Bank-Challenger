import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateGoal() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [image, setImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [inputMethod, setInputMethod] = useState("direct");

    const handleDirectInput = () => {
        setInputMethod("direct");
    };

    const handleSearchInput = () => {
        setInputMethod("search");
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post("/api/search", { query: searchTerm });
            setSearchResult(response.data);
        } catch (error) {
            console.error("Error searching for product:", error);
        }
    };

    const handleSelectProduct = (product) => {
        setName(product.title);
        setAmount(product.price);
        setImage(product.image);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the goal data to the backend here
        // Include name, amount, startDate, image, and any other relevant data
        // After saving, close the popup
        window.close();
    };

    return (
        <div>
            <h1>목표 생성</h1>
            <div>
                <button onClick={handleDirectInput}>직접 입력</button>
                <button onClick={handleSearchInput}>검색하여 입력</button>
            </div>
            {inputMethod === "direct" ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>목표 이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>목표 금액</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>목표 시작일</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div>
                        <label>이미지 첨부</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">생성</button>
                </form>
            ) : (
                <div>
                    <div>
                        <label>검색어</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </div>
                    {searchResult && (
                        <div>
                            <h2>검색 결과</h2>
                            {searchResult.map((product) => (
                                <div key={product.id}>
                                    <h3>{product.title}</h3>
                                    <p>{product.lprice}</p>                                <img src={product.image}
                                                                                                alt={product.title}/>
                                    <button onClick={() => handleSelectProduct(product)}>
                                        선택
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div>
                        <label>목표 이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>목표 시작일</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <button type="submit">생성</button>
                </div>
            )}
        </div>
    );
}

export default CreateGoal;