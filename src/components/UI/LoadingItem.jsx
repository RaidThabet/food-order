export default function LoadingItem() {
    return (
      <div className="w-80">
        <div className="flex flex-col justify-between p-4 w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600">
          <div>
            <h1 className=" w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
          <h1 className=" w-44 h-11 mt-4 bg-gray-200 rounded-md dark:bg-gray-700" />
        </div>
      </div>
    );
}