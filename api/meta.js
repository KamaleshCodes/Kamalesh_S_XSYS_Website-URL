module.exports = function handler(req, res) {
  res.status(200).json({
    name: 'Kamalesh S',
    role: 'MBA Candidate @ XIMB | Ex-L&T | Mech Engineer',
    status: 'open_to_opportunities'
  });
};
