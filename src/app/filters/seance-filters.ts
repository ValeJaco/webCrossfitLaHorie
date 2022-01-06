export class SeanceFilters {

  startDate: Date;

  filtersToApi(): string {
    let filters = "";

    if (this.startDate) {
      filters += this.startDate.toJSON();
    }

    if (filters.length > 0) {
      filters = "?" + filters;
    }

    return filters;
  }

}
