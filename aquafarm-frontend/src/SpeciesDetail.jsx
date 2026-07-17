import React from "react";
import { useParams, Navigate } from "react-router-dom";

export default function SpeciesDetail() {
  const { slug } = useParams();
  return <Navigate to={`/aquarium-types#${slug}`} replace />;
}
