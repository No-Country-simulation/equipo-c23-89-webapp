import { OFFER_INITIAL_VALUES } from '../initial-values/offer'
import { create } from 'zustand'
import { type Offer } from '../types/offer'

interface OfferStore {
  offers: Offer[]
  allOffers: Offer[]
  setOffers: (offer: Offer[]) => void
  setAllOffers: (offer: Offer[]) => void
}

export const useOfferStore = create<OfferStore>((set) => ({
  offers: [OFFER_INITIAL_VALUES],
  allOffers: [OFFER_INITIAL_VALUES],
  setOffers: (offers: Offer[]) => { set({ offers }) },
  setAllOffers: (allOffers: Offer[]) => { set({ allOffers }) }
}))
