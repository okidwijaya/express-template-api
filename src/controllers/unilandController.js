const { unilandModelsApi, unilandPostRegisterWarranty, unilandGetAllDataWarranty } = require("../models/unilandModel");
const sendRes = require("../helpers/sendResponse");

const unilandAllDataController = async(req, res) => {
    const { name = '', product = '', date = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const { data, totalItems } = await unilandModelsApi({ name, product, date, limit, offset });

        // Calculate total pages
        const totalPages = Math.ceil(totalItems / limit);

        // Ensure data and pagination information is returned correctly
        res.json({
            data,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page
            }
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
    // res.status(200).json({
    //     msg: 'uniland all data',
    // });
};

const unilandGetAllDataWarrantyController = async(req, res, next) => {
    const { name, email, phone, purchase_date, product, invoice, purchase_location } = req.query;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit; 

    const searchParams = {
        name,
        email,
        phone,
        purchase_date,
        product,
        invoice,
        purchase_location,
        offset,
        limit
    };

    try{
        const {status, result, total} = await unilandGetAllDataWarranty(searchParams);
    
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;

        const paginationInfo = {
            total,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage
        };

        res.status(status).json({
            result,
            paginationInfo,
            msg: 'success'
        });
    }catch({status, err}){
        res.status(500).json({error:err});
    }
};

const unilandCreateRegisterWarranty = async (req, res) => {
    const { customer_id, name, email, phone, address, purchase_date, product, invoice, purchase_location } = req.body;

    const idregis = customer_id;
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;

    const id_registration = `reg-${idregis}-${formattedDate}`;

    if (!id_registration || !customer_id || !name || !email || !phone || !address || !purchase_date || !product || !invoice || !purchase_location) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newWarranty = { id_registration, customer_id, name, email, phone, address, purchase_date, product, invoice, purchase_location };

    try {
        const result = await unilandPostRegisterWarranty(newWarranty);
        res.status(201).json({ message: 'Warranty registration created successfully', res: result.status });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Database error' });
    }
};


module.exports = { 
    unilandAllDataController, 
    unilandCreateRegisterWarranty,
    unilandGetAllDataWarrantyController };