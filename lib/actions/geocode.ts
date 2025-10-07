interface GeoCodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryfromCoordinates(
  lat: number,
  lng: number
): Promise<GeoCodeResult> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );

  const data = await response.json();

  const result = data.results[0];
  const countryComponent = result.address_components.find((component: any) =>
    component.types.includes('country')
  );

  return {
    country: countryComponent.long_name || 'unknown',
    formattedAddress: result.formatted_address,
  };
}
