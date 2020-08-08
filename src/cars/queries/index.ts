export const queryOneOrAll = (
  lotNumber?: string,
  vin?: string,
  page: number = 1,
): string => {
  const carQuery = `
       {
          car$r{
            list {
              id,
              createdAt,
              internalId,
              make,
              model,
              trim,
              year,
              mileage,
              color,
              vin,
              location {
                location
              }
              inspection {
                id
              }
              status { 
                  status
              }
            },
          }
        }
      `;

  let queryUpdate = '';
  if (lotNumber) {
    queryUpdate = `(internalId:"${lotNumber}",page:${page})`;
  } else if (vin) {
    queryUpdate = `(vin:"${vin}",page:${page})`;
  } else {
    queryUpdate = `(page:${page})`;
  }

  const queryInjectedWithParameters = carQuery.replace('$r', queryUpdate);

  return queryInjectedWithParameters;
};
