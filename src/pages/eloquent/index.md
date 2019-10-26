---
path: '/hidden-laravel-eloquent-features-you-may-not-know'
date: '2019-10-24'
title: '10 Hidden Laravel Eloquent Features You May Not Know'
author: 'Jino Antony'
---

Laravel is a feature-rich framework. However, you cannot find all the available features in the official documentation. Here are some features that you may not know.

1. **Get original attributes**

After mutating an Eloquent record you can get the original attributes by calling **getOriginal()**

    $user = App\User::first();
    $user->name;                   //John

    $user->name = "Peter";         //Peter

    $user->**getOriginal('name')**;    //John
    $user->**getOriginal()**;          //Original $user record

2. **Check if Model changed**

Determine if the model or given attribute have been modified using **isDirty()**

    $user = App\User::first();
    $user->**isDirty()**;          //false

    $user->name = "Peter";
    $user->**isDirty()**;          //true

You can also check if a particular attribute is changed.

    $user->**isDirty('name')**;    //true
    $user->**isDirty('age')**;     //false

3. **Get changed attributes**

Retrieve the changed attributes of a model using **getChanges()**

    $user->**getChanges()**

    //[
         "name" => "Peter",
      ]
> Note: Changes will reflect only if you save the model or sync the changes using **syncChanges()**

4. **Custom deleted_at column**

By default, Laravel handles soft deletes using deleted_at column. You can change this by explicitly defining the DELETED_AT property.

    class User extends Model
    {
        use SoftDeletes;
    
         * The name of the "deleted at" column.
         *
         * [@var](http://twitter.com/var) string
         */
        const DELETED_AT = 'is_deleted';
    }

Or by defining an accessor.

    class User extends Model
    {
        use SoftDeletes;
    
        public function getDeletedAtColumn()
        {
            return 'is_deleted';
        }
    }

5. **Save models and relationships**

You can save a model and its corresponding relationships using the **push()** method.

    class User extends Model
    {
        public function phone()
        {
            return $this->hasOne('App\Phone');
        }
    }

    $user = User::first();
    $user->name = "Peter";

    $user->phone->number = '1234567890';

    $user->**push();** // This will update both user and phone record in DB

6. **Reload fresh model**

Reload a fresh model instance from the database using **fresh()**

    $user = App\User::first();
    $user->name;               // John

    // user record get updated by another thread. eg: 'name' changed to // Peter.

    $updatedUser = $user->**fresh()**; 
    $updatedUser->name;       // Peter

    $user->name;              // John

7. **Reload existing model**

You can reload an existing model with fresh values from database using **refresh()**

    $user = App\User::first();
    $user->name;               // John

    // user record get updated by another thread. eg: 'name' changed to // Peter.

    $user->**refresh()**; 
    $user->name;              // Peter
> Note: **refresh()** will also update the loaded relations of the existing model.

8. **Check if models are the same**

Determine if two models have the same ID and belong to the same table using **is()**

    $user = App\User::find(1);
    $sameUser = App\User::find(1);
    $diffUser = App\User::find(2);

    $user->**is($sameUser)**;       // true
    $user->**is($diffUser)**;       // false

9. **Clone a model**

You can clone a model using **replicate()**. It will create a copy of the model into a new, non-existing instance.

    $user = App\User::find(1);
    $newUser = $user->**replicate();**

    $newUser->save();

10. **Specify attributes in find() method**

When using find() or findOrFail() methods you can specify the attributes to select as the second argument.

    $user = App\User::**find(1, ['name', 'age'])**;

    $user = App\User::**findOrFail(1, ['name', 'age'])**;

If you find this article helpful show some love by clicking on the 👏 icon several times. Also love to hear your opinions and thoughts on this. You can find me on [Twitter](https://twitter.com/Jino_Antony17).
