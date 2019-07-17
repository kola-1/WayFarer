import express from 'express';
import trimmer from 'trim-request-body';
import cors from 'cors';
import auth from './routes/auth';
import trips from './routes/trips';
import bookings from './routes/bookings';
import buses from './routes/buses';

export default (wayfarer) => {
    // allow cross origin access
    wayfarer.use(cors());

    // Parse application/json
    wayfarer.use(express.json());

    // Parse application/xwww-
    wayfarer.use(express.urlencoded({ extended: true }));

    // Trim the parsed request body
    wayfarer.use(trimmer);

    // Pass request to routes
    wayfarer.use('/api/v1/auth', auth);
    wayfarer.use('/api/v1/trips', trips);
    wayfarer.use('/api/v1/bookings', bookings);
    wayfarer.use('/api/v1/buses', buses);

    wayfarer.use('*', (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Welcome to WayFarer',
        });
    });
};
