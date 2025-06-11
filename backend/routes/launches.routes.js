import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const SPACEX_API_URL = 'https://api.spacexdata.com/v3/launches?limit=1000';

// deduplicate by `flight_number`
const deduplicateLaunches = (launches) => {
  const seen = new Set();
  return launches.filter(({ flight_number }) => {
    if (seen.has(flight_number)) return false;
    seen.add(flight_number);
    return true;
  });
};

// filter launches based on query params
const filterLaunches = (launches, { search, year, status }) => {
  const lowerSearch = search?.toLowerCase();

  return launches.filter((launch) => {
    const matchesSearch = lowerSearch
      ? launch.mission_name?.toLowerCase().includes(lowerSearch)
      : true;

    const matchesYear = year ? launch.launch_year === year : true;

    let matchesStatus = true;
    if (status === 'success') {
      matchesStatus = launch.launch_success === true;
    } else if (status === 'failed') {
      matchesStatus = launch.launch_success === false;
    } else if (status === 'upcoming') {
      matchesStatus = launch.upcoming === true;
    }

    return matchesSearch && matchesYear && matchesStatus;
  });
};

// sort by launch year (desc) then launch date (desc)
const sortLaunches = (launches) => {
  return launches.sort((a, b) => {
    const yearDiff = parseInt(b.launch_year) - parseInt(a.launch_year);
    if (yearDiff !== 0) return yearDiff;

    return new Date(b.launch_date_utc) - new Date(a.launch_date_utc);
  });
};

router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      year = '',
      status = '',
      offset = '0',
      limit = '10',
    } = req.query;

    const rawResponse = await fetch(SPACEX_API_URL);
    const allLaunches = await rawResponse.json();

    const unique = deduplicateLaunches(allLaunches);
    const filtered = filterLaunches(unique, { search, year, status });
    const sorted = sortLaunches(filtered);

    const start = Number(offset);
    const end = start + Number(limit);
    const paginated = sorted.slice(start, end);

    res.json({
      launches: paginated,
      hasMore: end < sorted.length,
      total: sorted.length,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch SpaceX launches' });
  }
});

export default router;
