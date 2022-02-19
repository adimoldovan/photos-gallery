<script>
</script>

<h1 class="page-title">Get in touch</h1>
<div id="contact" class="form-container">
  <form name="contact" method="POST">
    <input type="hidden" name="form-name" value="contact" />
    <div class="row">
      <div class="label">
        <label for="input-name">Name</label>
      </div>
      <div class="input">
        <input id="input-name" type="text" name="name" />
      </div>
    </div>
    <div class="row">
      <div class="label">
        <label for="input-email">Email *</label>
      </div>
      <div class="input">
        <input id="input-email" type="email" name="email" required />
      </div>
    </div>
    <div class="row">
      <div class="label">
        <label for="input-message">Message *</label>
      </div>
      <div class="input">
        <textarea id="input-message" name="message" required />
      </div>
    </div>
    <div class="row">
      <button type="submit" name="submit">Send</button>
    </div>
  </form>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }

  button {
    background-color: #ffffff;
    color: #333333;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  button:hover {
    background-color: #f5f5f5;
  }

  .form-container {
    border-radius: 5px;
    max-width: 600px;
    padding: 20px;
    margin: auto;
  }

  .label {
    float: left;
    width: 25%;
    margin-top: 6px;
  }

  .input {
    float: left;
    width: 75%;
    margin-top: 6px;
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  @media screen and (max-width: 600px) {
    .label,
    .input,
    button {
      width: 100%;
      margin-top: 0;
    }
  }
</style>
