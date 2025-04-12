const { validateAddRequest } = require('../helpers/validation');

const getHewan = (req, res) => {
    const { kesayangan, sort } = req.query;
    let hewanData = req.app.locals.hewanData;
    if (kesayangan) {
        hewanData = hewanData.filter(hewan => hewan.kesayangan === (kesayangan === 'true'));
    }
    if (sort) {
        if (!['asc', 'desc'].includes(sort)) {
            return res.status(400).json({
                message: 'Invalid sort parameter. Use "asc", "desc" or leave it.'
            });
        }
        hewanData = hewanData.sort((a, b) => {
            if (sort === 'asc') {
                return a.nama.localeCompare(b.nama);
            } else if (sort === 'desc') {
                return b.nama.localeCompare(a.nama);
            }
            return 0;
        });
    }
    hewanData = hewanData.map(({ nama, jenis, ras, karakteristik }) => ({ nama, jenis, ras, karakteristik }));
    return res.status(200).json(hewanData);
}
const addHewan = (req, res) => {
    // Validate the request body
    const validatedRequest = validateAddRequest(req.body);
    if (!validatedRequest.status) {
        return res.status(400).json({
            message: validatedRequest.message,
            errors: validatedRequest.errors
        });
    }
    // Logic to add a new animal
    const hewanData = req.app.locals.hewanData;
    const existingHewan = hewanData.find(hewan => hewan.nama === req.body.nama);
    if (existingHewan) {
        return res.status(400).json({
            message: 'Animal with this name already exists'
        });
    }
    const newAnimal = req.body;
    req.app.locals.hewanData.push(newAnimal); // Save new animal to the in-memory data
    return res.status(201).json({
        message: 'Animal added successfully',
        animal: newAnimal
    });
}
const updateHewan = (req, res) => {


    return res.status(200).json({
        message: 'Update hewan'
    });
}
module.exports = {
    getHewan,
    addHewan,
    updateHewan
}