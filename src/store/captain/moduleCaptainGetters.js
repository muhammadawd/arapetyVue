/*=========================================================================================
  File Name: moduleCaptainGetters.js
  Description: Captain Module Getters
==========================================================================================*/


export default {
  getCaptainById: state => (captainId) => state.captains.find((captain) => captain.id == captainId),
  getAllCaptains: state => state.captains,
  getAllCaptainsSearchSorted: state => {
    let Captains = state.captains;

    if (state.querySearch) {
      Captains = Captains.filter((captain) => {
        let name = captain.first_name + ' ' + captain.last_name;
        return name.toLowerCase().includes(state.querySearch.toLowerCase())
      })
    }

    Captains = _.sortBy(Captains, ['image_path']);

    return Captains;
  }
}
