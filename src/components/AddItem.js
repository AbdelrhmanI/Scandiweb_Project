import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import "../style/addItem.css";

const AddItem = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');
    const [inputs, setInputs] = useState({});
    const [errorMessages, setErrorMessages] = useState({
        sku: '',
        name: '',
        price: '',
        productType: '',
        size: '',
        weight: '',
        height: '',
        width: '',
        length: '',
        duplicateSKU: ''
    });
    const [existingItems, setExistingItems] = useState([]);

    const fetchExistingItems = async () => {
        try {
            const response = await fetch("http://localhost/php-project/fetch.php");
            const items = await response.json();
            setExistingItems(items);
        } catch (error) {
            console.error("Error fetching existing items:", error);
        }
    };

    useEffect(() => {
        fetchExistingItems();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requiredFields = ['sku', 'name', 'price', 'productType'];
        const missingFields = requiredFields.filter(field => !inputs[field] && inputs[field] !== '');

        if (missingFields.length > 0) {
            const newErrorMessages = { ...errorMessages };
            missingFields.forEach(field => {
                newErrorMessages[field] = `Please fill in ${field}.`;
            });
            setErrorMessages(newErrorMessages);
            return;
        }

        // Additional validation for category-specific fields
        const categoryFields = {
            dvd: ['size'],
            book: ['weight'],
            furniture: ['height', 'width', 'length']
        };

        const missingCategoryFields = categoryFields[selectedValue].filter(field => !inputs[field] && inputs[field] !== '');

        if (missingCategoryFields.length > 0) {
            const newErrorMessages = { ...errorMessages };
            missingCategoryFields.forEach(field => {
                newErrorMessages[field] = `Please fill in ${field} for the selected productType.`;
            });
            setErrorMessages(newErrorMessages);
            return;
        }

        // Size input validation for dvd
        if (selectedValue === 'dvd' && (!inputs.size || inputs.size === '')) {
            setErrorMessages({ ...errorMessages, size: "Please provide disc space (size) in MB for DVD." });
            return;
        }
        // Weight input validation for book
        if (selectedValue === 'book' && (!inputs.weight || inputs.weight === '')) {
            setErrorMessages({ ...errorMessages, weight: "Please provide weight in KG for Book." });
            return;
        }
        // Furniture specific validation
        if (selectedValue === 'furniture') {
            const furnitureFields = ['height', 'width', 'length'];
            const allFieldsFilled = furnitureFields.every(field => inputs[field] && inputs[field] !== '');

            if (!allFieldsFilled) {
                const newErrorMessages = { ...errorMessages };
                furnitureFields.forEach(field => {
                    if (!inputs[field] || inputs[field] === '') {
                        newErrorMessages[field] = `Please fill ${field} in CM.`;
                    }
                });
                setErrorMessages(newErrorMessages);
                return;
            }
        }

        // Clear previous error messages
        setErrorMessages({ ...errorMessages, duplicateSKU: '' });

        // Assuming your server endpoint is correct, send a POST request
        const isDuplicateSKU = existingItems.some((item) => item.sku === inputs.sku);

        if (isDuplicateSKU) {
            setErrorMessages({ ...errorMessages, duplicateSKU: "Duplicate SKU. Please provide a unique SKU." });
            return;
        }
        try {
            const response = await axios.post('http://localhost/php-project/add.php', inputs);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessages({ ...errorMessages, duplicateSKU: "Error saving item. Please try again." });
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));

        // Clear the corresponding error message when the user types
        setErrorMessages({ ...errorMessages, [name]: '' });
    };

    const handleSelectChange = (event) => {
        const productType = event.target.value;
        setSelectedValue(productType);

        // Include the selected productType in the inputs
        setInputs((prevInputs) => ({ ...prevInputs, productType }));

        // Reset only the relevant input fields based on the selected productType
        setInputs((prevInputs) => {
            const resetFields = { ...prevInputs }; // Create a copy of previous inputs
            switch (productType) {
                case 'dvd':
                    resetFields.size = '';
                    resetFields.weight = undefined; // Reset other productType fields
                    resetFields.height = undefined;
                    resetFields.width = undefined;
                    resetFields.length = undefined;
                    break;
                case 'book':
                    resetFields.weight = '';
                    resetFields.size = undefined;
                    resetFields.height = undefined;
                    resetFields.width = undefined;
                    resetFields.length = undefined;
                    break;
                case 'furniture':
                    resetFields.height = '';
                    resetFields.width = '';
                    resetFields.length = '';
                    resetFields.size = undefined;
                    resetFields.weight = undefined;
                    break;
                default:
                    break;
            }
            return resetFields;
        });
    };

    return (
        <div>
            <Header path={'/'} submithandle={handleSubmit} btn={'Cancel'} btn2={'Save'} htext={'Product Add'} />
            <div>
                <div>
                    <form id='product_form'>
                        <h1> ADD ITEM </h1>
                        {errorMessages.duplicateSKU && <label style={{ color: 'red' }}>{errorMessages.duplicateSKU}</label>}
                        <fieldset>
                            <label htmlFor="sku">SKU:</label>
                            <input type="text" id="sku" name="sku" placeholder="SKU" onChange={handleChange} required />
                            {errorMessages.sku && <label style={{ color: 'red' }}>{errorMessages.sku}</label>}

                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Name" onChange={handleChange} required />
                            {errorMessages.name && <label style={{ color: 'red' }}>{errorMessages.name}</label>}

                            <label htmlFor="price">Price:</label>
                            <input type="number" min='0' id="price" name="price" placeholder="Price" onChange={handleChange} style={{ height:'30px' ,width: '200px' }} required />
                            {errorMessages.price && <label style={{ color: 'red' }}>{errorMessages.price}</label>}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="productType">Product_Type</label>
                            <select id="productType" name="productType" value={selectedValue} onChange={handleSelectChange} required>
                                <optgroup label="productType">
                                    <option value=""></option>
                                    <option value="dvd">DVD</option>
                                    <option value="book">Book</option>
                                    <option value="furniture">Furniture</option>
                                </optgroup>
                            </select>
                            {errorMessages.productType && <label style={{ color: 'red' }}>{errorMessages.productType}</label>}
                        </fieldset>
                        {selectedValue === 'dvd' && (
                            <div>
                                <fieldset>
                                    <label htmlFor="size">Size (MB)</label>
                                    <input placeholder="#size" id='size' type="number" min="0" name="size" onChange={handleChange} required />
                                    {errorMessages.size && <label style={{ color: 'red' }}>{errorMessages.size}</label>}
                                    <label>Please, provide disc space in MB.</label>
                                </fieldset>
                            </div>
                        )}
                        {selectedValue === 'book' && (
                            <div>
                                <fieldset>
                                    <label htmlFor="weight">Weight (KG)</label>
                                    <input placeholder="#weight" id='weight' type="number" min="0" name="weight" onChange={handleChange} required />
                                    {errorMessages.weight && <label style={{ color: 'red' }}>{errorMessages.weight}</label>}
                                    <label>Please, provide weight in KG.</label>
                                </fieldset>
                            </div>
                        )}
                        {selectedValue === 'furniture' && (
                            <div>
                                <fieldset>
                                    <label htmlFor="height">Height (CM)</label>
                                    <input placeholder="#height" id='height' type="number" min="0" name="height" required onChange={handleChange} />
                                    {errorMessages.height && <label style={{ color: 'red' }}>{errorMessages.height}</label>}
                                    <label htmlFor="width">Width (CM)</label>
                                    <input placeholder="#width" id='width' type="number" min="0" name="width" required onChange={handleChange} />
                                    {errorMessages.width && <label style={{ color: 'red' }}>{errorMessages.width}</label>}
                                    <label htmlFor="length">Length (CM)</label>
                                    <input placeholder="#length" id='length' type="number" min="0" name="length" required onChange={handleChange} />
                                    {errorMessages.length && <label style={{ color: 'red' }}>{errorMessages.length}</label>}
                                    <label>Please, provide dimensions in CM.</label>
                                </fieldset>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddItem;

