import Image from "../Image";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import api, { getAuthHeader } from "../../lib/api";
const images = [
  {
    id: "1",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
  {
    id: "2",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
  {
    id: "3",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
  {
    id: "4",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
  {
    id: "5",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
  {
    id: "6",
    url: "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut ipsum vel ante elementum sodales id sit amet quam. Duis consectetur dictum lectus, sit amet luctus ante posuere ac. Phasellus sit amet efficitur lorem. Nunc tempor nisl eu fermentum iaculis. Phasellus tempus fringilla velit, ultricies egestas lectus rhoncus et. Vestibulum finibus dui ex, nec scelerisque augue finibus ac. Aliquam erat volutpat. Phasellus lacinia accumsan tortor, ac facilisis ex feugiat a. Nam lacinia nunc gravida purus fermentum, sit amet ullamcorper lectus suscipit. Phasellus placerat tellus vitae ornare fringilla.\n" +
      "\n" +
      "Nullam erat ante, lacinia quis volutpat et, finibus aliquet purus. Aenean semper purus sit amet interdum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis gravida tellus et tristique. Cras id arcu quis tortor cursus lobortis ut nec felis. Vestibulum nec nibh pretium, feugiat nulla efficitur, porta lacus. Donec vestibulum volutpat turpis sed elementum. Sed quis tellus ultricies, egestas arcu at, dignissim libero. Suspendisse nec velit nec ligula tincidunt dapibus. Maecenas laoreet mauris non nibh volutpat consectetur. Proin molestie turpis sed nulla vestibulum, vel fringilla nisl dignissim. Proin laoreet, lorem non rhoncus elementum, dolor turpis rhoncus nisi, in accumsan metus mauris vitae erat. Duis nisi quam, ultrices at ipsum id, laoreet imperdiet risus. Integer diam libero, varius in dictum a, ornare et est. Fusce scelerisque fermentum dui vel ornare. Donec sem libero, viverra quis justo vitae, bibendum vehicula nisi.",
  },
];

const serverUri = process.env.REACT_APP_SERVER_URI;
console.log("serverUri: ", serverUri);
const Gallery = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  console.log("user: ", user);
  const { isLoading, error, data } = useQuery("images", async () =>
    api.get("/images", {
      headers: getAuthHeader(await getAccessTokenSilently()),
    })
  );
  console.log("isLoading: ", isLoading);
  console.log("error: ", error);
  console.log("data: ", data);
  return (
    <>
      <h1 className="text-center font-bold py-10 text-3xl dark:text-white">
        Image Gallery
      </h1>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {images.map((image) => (
              <Image
                id={image.id}
                key={image.id}
                url={image.url}
                description={image.description}
                onClick={(id) => console.log("id: ", id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
