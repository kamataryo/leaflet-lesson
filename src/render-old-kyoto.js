'use strict'

export default (map, L) => {

  const ENDPOINT1 = 'http://www.arc.ritsumei.ac.jp/archive01/theater/image/PB/geo/maps/meisai_sougou/{z}/{x}/{y}.png'
  const ENDPOINT2 = 'http://www.arc.ritsumei.ac.jp/archive01/theater/image/PB/geo/maps/meisai_hasegawa/{z}/{x}/{y}.png'
  L.tileLayer(ENDPOINT1).addTo(map)
  L.tileLayer(ENDPOINT2).addTo(map)
}
