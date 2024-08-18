const getDetailNew = async (slug: string) => {
  // in processing
  return;
};
const DetailNew = ({ slug }: { slug: string }) => {
  return (
    <div className="mx-auto mt-2 max-w-4xl rounded-lg bg-white p-2 shadow-md">
      <h1 className="mb-4 text-3xl font-bold">Quê hương đất nước</h1>
      <div className="mb-4 flex justify-start space-x-2">
        <p className="font-semibold text-gray-600">Tác giả:</p>
        <p className="text-gray-600">Nguyễn Khoa Điềm</p>
      </div>

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBqx3gveX6WI46tHAwfnHAfI1oS6UMfEHkg&s"
        className="w-full items-center rounded-md"
      />
      <div className="prose mt-2">
        <p>
          Đây là nội dung của bài viết. Nội dung bài viết được viết ở đây để mô
          tả chi tiết về bài viết này.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet
          enim tortor, a egestas velit fermentum a. Vivamus at dictum quam.
          Suspendisse potenti. Proin ac urna et nunc fringilla dignissim non
          eget lacus. Duis id metus eget sapien elementum facilisis. Curabitur
          vel mauris neque. Aenean viverra orci ut justo gravida, id
          sollicitudin erat facilisis. Curabitur blandit, urna eu facilisis
          gravida, lectus risus elementum purus, nec sagittis ipsum magna in
          lectus. Suspendisse malesuada, nisi a fermentum consequat, felis leo
          iaculis sapien, at feugiat lacus libero non justo.
        </p>
        <p>
          Integer at eros nec risus gravida gravida. Maecenas ac nisi leo. Ut
          facilisis tortor quis libero suscipit scelerisque. Aliquam erat
          volutpat. Suspendisse nec augue orci. Aliquam erat volutpat. Praesent
          vel lacus elit. Curabitur auctor, libero nec luctus facilisis, justo
          ex consectetur eros, a porttitor leo nunc id erat. Sed blandit
          ullamcorper felis, et feugiat risus condimentum id.
        </p>
      </div>
    </div>
  );
};
export default DetailNew;
