import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Resource } from "../slices/tableSlice";

/**
 * This file contains selectors regarding table filters
 */

export const getAllFilters = (state: RootState) => state.tableFilters.data;
export const getStats = (state: RootState) => state.tableFilters.stats;
export const getAllTextFilter = (state: RootState) => state.tableFilters.textFilter;
export const getSelectedFilter = (state: RootState) => state.tableFilters.selectedFilter;
export const getSecondFilter = (state: RootState) => state.tableFilters.secondFilter;
export const getCurrentFilterResource = (state: RootState) => state.tableFilters.currentResource;
export const getFilters = (state: RootState, resource: string) =>
	state.tableFilters.data.filter(obj => obj.resource === resource);
export const getTextFilter = createSelector(
	[getAllTextFilter, (state, resource: Resource) => resource],
	(textFilter, resource) => {
		if (Array.isArray(textFilter)) {
			const textFilte = textFilter.find(obj => obj.resource === resource);
			return textFilte?.text ?? "";
		} else {
			console.warn("clearing localStorage and reloading...");
			localStorage.clear();
			window.location.href = window.location.href + "?forceReload=" + Date.now();
			return "";
		}
	},
);
